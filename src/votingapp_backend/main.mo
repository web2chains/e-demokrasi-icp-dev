import List "mo:base/List";
import Nat "mo:base/Nat";
import Nat64 "mo:base/Nat64";
import Bool "mo:base/Bool";
import Float "mo:base/Float";
import Array "mo:base/Array";
import Time "mo:base/Time";
import { setTimer } = "mo:base/Timer";
import Int "mo:base/Int";
import Principal "mo:base/Principal";

actor main {
  type Candidate = {
    id: Nat;
    name: Text;
    electionId: Nat;
    votes: Nat;
  };

  type Election = {
    id: Nat;
    title: Text;
    isOpen: Bool;
    category: Text;
    endTime: ?Nat64;
  };

  stable var elections: List.List<Election> = List.nil<Election>();
  stable var candidates: List.List<Candidate> = List.nil<Candidate>();
  stable var voterRegistry: List.List<(Principal, Nat)> = List.nil<(Principal, Nat)>();
  stable var adminRegistry: List.List<Principal> = List.nil<Principal>();

  func contains(xs: [Text], val: Text) : Bool {
    for (x in xs.vals()) {
      if (x == val) return true;
    };
    return false;
  };

  public func createAdmin(p: Principal): async Text {
    if (List.find<Principal>(adminRegistry, func(x: Principal): Bool { x == p }) != null) {
      return "Admin already exists.";
    };
    adminRegistry := List.push(p, adminRegistry);
    return "Admin added successfully.";
  };

  public func isAdmin(p: Principal): async Bool {
    switch (List.find<Principal>(adminRegistry, func(x: Principal): Bool { x == p })) {
      case (?_) true;
      case null false;
    }
  };

  public func CreateElection(title: Text, category: Text): async Text {
    let newId = List.size(elections) + 1;
    let newElection = {
      id = newId;
      title = title;
      category = category;
      isOpen = false;
      endTime = null;
    };
    elections := List.push(newElection, elections);
    return "Election '" # title # "' in category '" # category # "' created.";
  };

  public func addCandidate(electionId: Nat, name: Text): async Text {
    let electionOpt = List.find<Election>(elections, func(e: Election): Bool { e.id == electionId });
    switch (electionOpt) {
      case (?election) {
        let newCandidateId = List.size(candidates) + 1;
        let newCandidate = {
          id = newCandidateId;
          name = name;
          electionId = electionId;
          votes = 0;
        };
        candidates := List.push(newCandidate, candidates);
        return "Candidate " # name # " added successfully to election ID " # Nat.toText(electionId) # "!";
      };
      case null {
        return "Election with ID " # Nat.toText(electionId) # " not found.";
      };
    }
  };

  public func getElections(): async [Election] {
    return List.toArray(elections);
  };

  public func getCandidates(electionId: Nat): async [Candidate] {
    return List.toArray(
      List.filter<Candidate>(candidates, func(c: Candidate): Bool {
        c.electionId == electionId;
      })
    );
  };

  public func openVote(electionId: Nat, durationInSeconds: Nat): async Text {
  let now = Time.now() / 1_000_000_000; // detik
  let end = Nat64.fromIntWrap(now + durationInSeconds);

  elections := List.map<Election, Election>(elections, func(e: Election): Election {
    if (e.id == electionId and not e.isOpen) {
      { e with isOpen = true; endTime = ?end };
    } else {
      e
    }
  });

  // Set timer untuk otomatis tutup voting
  ignore setTimer<system>(
    #seconds durationInSeconds,
    func() : async () {
      ignore await closeExpiredElections();
    }
  );

  return "Election " # Nat.toText(electionId) # " has started and will end in " # Nat.toText(durationInSeconds) # " seconds!";
  };


  public func castVote(electionId: Nat, candidateId: Nat): async Text {
    let caller = Principal.fromActor(main);

    let electionOpt = List.find<Election>(elections, func(e: Election): Bool { e.id == electionId });
    switch (electionOpt) {
      case (?election) {
        if (not election.isOpen) {
          return "Election is closed!";
        };

        let hasVoted = List.find<(Principal, Nat)>(voterRegistry, func(entry: (Principal, Nat)): Bool {
          entry.0 == caller and entry.1 == electionId
        }) != null;

        if (hasVoted) {
          return "You have already voted in this election!";
        };

        let candidateOpt = List.find<Candidate>(candidates, func(c: Candidate): Bool {
          c.id == candidateId;
        });

        switch (candidateOpt) {
          case (?candidate) {
            candidates := List.map<Candidate, Candidate>(candidates, func(c: Candidate): Candidate {
              if (c.id == candidateId) {
                { c with votes = c.votes + 1 };
              } else {
                c
              }
            });

            voterRegistry := List.push((caller, electionId), voterRegistry);

            return "Vote cast successfully for " # candidate.name # "!";
          };
          case null {
            return "Candidate not found!";
          };
        };
      };
      case null {
        return "Election not found!";
      };
    }
  };

  public func getElectionResults(electionId: Nat): async [(Text, Nat, Float)] {
    let electionOpt = List.find<Election>(elections, func(e: Election): Bool {
      e.id == electionId
    });

    switch (electionOpt) {
      case (?election) {
        let filteredCandidates = List.filter<Candidate>(candidates, func(c: Candidate): Bool {
          c.electionId == election.id
        });

        let totalVoters = List.size(
          List.filter<(Principal, Nat)>(voterRegistry, func(entry: (Principal, Nat)): Bool {
            entry.1 == election.id
          })
        );

        let results = List.map<Candidate, (Text, Nat, Float)>(filteredCandidates, func(c: Candidate): (Text, Nat, Float) {
          let percent : Float = if (totalVoters == 0) 0 else Float.fromInt(c.votes) / Float.fromInt(totalVoters) * 100;
          (c.name, c.votes, percent)
        });

        return List.toArray(results);
      };
      case null {
        return [];
      };
    }
  };

  public query func getCandidateCountPerCategory(): async [(Text, Nat)] {
    var result: [(Text, Nat)] = [];
    var seenCategories: [Text] = [];

    for (election in List.toArray(elections).vals()) {
      if (not contains(seenCategories, election.category)) {
        let count = List.size(
          List.filter<Candidate>(candidates, func(c: Candidate): Bool {
            c.electionId == election.id
          })
        );
        result := Array.append(result, [(election.category, count)]);
        seenCategories := Array.append(seenCategories, [election.category]);
      };
    };
    return result;
  };

  public query func getVoterCountPerCategory(): async [(Text, Nat)] {
    var result: [(Text, Nat)] = [];
    var seenCategories: [Text] = [];

    for (election in List.toArray(elections).vals()) {
      if (not contains(seenCategories, election.category)) {
        let count = List.size(
          List.filter<(Principal, Nat)>(voterRegistry, func(entry: (Principal, Nat)): Bool {
            entry.1 == election.id
          })
        );
        result := Array.append(result, [(election.category, count)]);
        seenCategories := Array.append(seenCategories, [election.category]);
      };
    };
    return result;
  };
  public func closeExpiredElections() : async Text {
  let now = Nat64.fromIntWrap(Time.now() / 1_000_000_000);

  var countClosed = 0;

  elections := List.map<Election, Election>(elections, func(e: Election): Election {
    switch (e.endTime) {
      case (?end) {
        if (e.isOpen and now >= end) {
          countClosed += 1;
          { e with isOpen = false; endTime = null : ?Nat64 };
        } else {
          e
        }
      };
      case null e
    }
  });

  if (countClosed == 0) {
    return "No expired elections to close.";
  } else {
    return Nat.toText(countClosed) # " expired election(s) closed.";
  };
};
};
