import React, { useState, useEffect } from "react";
import { DashboardLayout } from "../components/VoterDashboard/DashboardLayout";
import {
  PieChart as RePieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { votingapp_backend } from "../../../declarations/votingapp_backend";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1", "#a28bd4"];
const CATEGORY_OPTIONS = [
  "Presiden & Wakil Presiden",
  "Gubernur",
  "DPR",
  "DPD",
];

export default function VoterDashboard() {
  const [category, setCategory] = useState("");
  const [elections, setElections] = useState([]);
  const [filteredElections, setFilteredElections] = useState([]);
  const [selectedElectionId, setSelectedElectionId] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [message, setMessage] = useState("");
  const [results, setResults] = useState([]);
  const [endTime, setEndTime] = useState(null);
  const [remainingTime, setRemainingTime] = useState("");

  useEffect(() => {
    (async () => {
      const list = await votingapp_backend.getElections();
      setElections(list);
    })();
  }, []);

  useEffect(() => {
    const filtered = category
      ? elections.filter((e) => e.category === category)
      : [];
    setFilteredElections(filtered);
    setSelectedElectionId("");
    setCandidates([]);
    setResults([]);
    setMessage("");
    setRemainingTime("");
    setEndTime(null);
  }, [category, elections]);

  useEffect(() => {
    if (!selectedElectionId) return;

    const election = elections.find(
      (e) => e.id.toString() === selectedElectionId
    );
    if (election?.endTime) {
      setEndTime(Number(election.endTime)); // UNIX timestamp in seconds
    } else {
      setEndTime(null);
      setRemainingTime("");
    }

    const interval = setInterval(() => {
      fetchCandidates();
      fetchResults();
    }, 5000);

    fetchCandidates();
    fetchResults();

    return () => clearInterval(interval);
  }, [selectedElectionId]);

  useEffect(() => {
    if (!endTime) return;

    const interval = setInterval(() => {
      const now = Math.floor(Date.now() / 1000);
      const diff = endTime - now;

      if (diff <= 0) {
        setRemainingTime("Voting closed");
        clearInterval(interval);
      } else {
        const minutes = Math.floor(diff / 60);
        const seconds = diff % 60;
        setRemainingTime(`${minutes}m ${seconds}s remaining`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  async function fetchCandidates() {
    const list = await votingapp_backend.getCandidates(
      BigInt(selectedElectionId)
    );
    setCandidates(list);
  }

  async function fetchResults() {
    const data = await votingapp_backend.getElectionResults(
      BigInt(selectedElectionId)
    );
    setResults(data);
  }

  async function castVote(candidateId) {
    const res = await votingapp_backend.castVote(
      BigInt(selectedElectionId),
      candidateId
    );
    setMessage(res);
    fetchCandidates();
    fetchResults();
  }

  const chartData = results.map(([name, _votes, percent]) => ({
    name,
    value: parseFloat(percent.toFixed(2)),
  }));

  return (
    <DashboardLayout className="space-y-8">
      {/* Select Category */}
      <section className="bg-cream rounded-lg p-6 shadow">
        <h2 className="font-poppins text-xl font-bold mb-4">Select Category</h2>
        <select
          className="w-full p-2 border rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">-- Choose Category --</option>
          {CATEGORY_OPTIONS.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </section>

      {/* Select Election */}
      {category && (
        <section className="bg-cream rounded-lg p-6 shadow">
          <h2 className="font-poppins text-xl font-bold mb-4">
            Select Election ({category})
          </h2>
          <select
            className="w-full p-2 border rounded"
            value={selectedElectionId}
            onChange={(e) => setSelectedElectionId(e.target.value)}
          >
            <option value="">-- Choose Election --</option>
            {filteredElections.map((e) => (
              <option key={e.id.toString()} value={e.id.toString()}>
                {e.title}
              </option>
            ))}
          </select>
        </section>
      )}

      {/* Timer Display */}
      {remainingTime && (
        <section className="bg-yellow-100 rounded-lg p-4 shadow">
          <p className="font-bold text-lg text-center text-yellow-800">
            ⏰ {remainingTime}
          </p>
        </section>
      )}

      {/* Candidates List */}
      {selectedElectionId && candidates.length > 0 && (
        <section className="bg-cream rounded-lg p-6 shadow">
          <h2 className="font-poppins text-xl font-bold mb-4">Candidates</h2>
          <div className="space-y-4">
            {candidates.map((c) => (
              <div
                key={c.id.toString()}
                className="flex justify-between items-center p-4 bg-white rounded"
              >
                <div>
                  <strong>{c.name}</strong>
                </div>
                <button
                  className="px-4 py-2 bg-purple-600 text-white rounded"
                  onClick={() => castVote(c.id)}
                >
                  Vote
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Message */}
      {message && (
        <section className="bg-cream rounded-lg p-4 shadow">
          <p className="font-inter text-base text-dark-gray">{message}</p>
        </section>
      )}

      {/* Live Results */}
      {results.length > 0 && (
        <section className="bg-cream rounded-lg p-6 shadow">
          <h2 className="font-poppins text-xl font-bold mb-4">
            Live Election Results
          </h2>
          <ul className="space-y-2 mb-6">
            {results.map(([name, votes, percent], idx) => (
              <li key={idx} className="font-inter">
                <strong>{name}</strong>: {votes.toString()} votes (
                {percent.toFixed(2)}%)
              </li>
            ))}
          </ul>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(1)}%`
                  }
                  outerRadius={100}
                >
                  {chartData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  formatter={(val) => val}
                />
              </RePieChart>
            </ResponsiveContainer>
          </div>
        </section>
      )}
    </DashboardLayout>
  );
}
