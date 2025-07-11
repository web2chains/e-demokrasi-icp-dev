import React, { useState, useEffect } from "react";
import { DashboardLayout } from "../components/AdminDashboard/DashboardLayout";
import { StatsCard } from "../components/AdminDashboard/StatsCard";
import {
  PieChart as RePieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { votingapp_backend } from "../../../declarations/votingapp_backend";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6384", "#8A2BE2"];
const CATEGORIES = [
  "Presiden & Wakil Presiden",
  "Gubernur",
  "DPR",
  "DPD",
];

export default function AdminDashboard() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [candidateName, setCandidateName] = useState("");
  const [selectedElectionId, setSelectedElectionId] = useState("");
  const [elections, setElections] = useState([]);
  const [results, setResults] = useState([]);
  const [selectedResultId, setSelectedResultId] = useState("");
  const [selectedFilterCategory, setSelectedFilterCategory] = useState("");
  const [candidateStats, setCandidateStats] = useState([]);
  const [voterStats, setVoterStats] = useState([]);
  const [openId, setOpenId] = useState("");
  const [duration, setDuration] = useState(""); // Durasi dalam jam

  useEffect(() => {
    loadElections();
    loadStats();
  }, []);

  async function loadElections() {
    const list = await votingapp_backend.getElections();
    setElections(list);
  }

  async function loadStats() {
    const cand = await votingapp_backend.getCandidateCountPerCategory();
    const vot = await votingapp_backend.getVoterCountPerCategory();
    setCandidateStats(cand);
    setVoterStats(vot);
  }

  async function createElection() {
    if (!title.trim() || !category.trim()) {
      return alert("Isi judul dan kategori!");
    }
    await votingapp_backend.CreateElection(title, category);
    setTitle("");
    setCategory("");
    loadElections();
    loadStats();
  }

  async function addCandidate() {
    if (!selectedElectionId || !candidateName.trim()) {
      return alert("Pilih election dan masukkan nama kandidat!");
    }
    await votingapp_backend.addCandidate(
      BigInt(selectedElectionId),
      candidateName
    );
    setCandidateName("");
    loadStats();
  }

  async function openVoting(id) {
    if (!id) return alert("Pilih election untuk dibuka!");
    if (!duration || isNaN(duration) || +duration <= 0) {
      return alert("Masukkan durasi voting dalam jam (angka positif)!");
    }
    const durationInSeconds = BigInt(parseFloat(duration) * 3600);
    await votingapp_backend.openVote(BigInt(id), durationInSeconds);
    setOpenId("");
    setDuration("");
    loadElections();
  }

  async function fetchResults(id) {
    if (!id) return setResults([]);
    const data = await votingapp_backend.getElectionResults(BigInt(id));
    setResults(data);
  }

  useEffect(() => {
    fetchResults(selectedResultId);
  }, [selectedResultId]);

  const pieData = results.map(([name, _votes, percent], index) => ({
    label: name,
    value: +percent.toFixed(2),
    percentage: +percent.toFixed(2),
    color: COLORS[index % COLORS.length],
  }));

  const filtered = selectedFilterCategory
    ? elections.filter((e) => e.category === selectedFilterCategory)
    : elections;

  return (
    <DashboardLayout className="space-y-8">
      {/* Create & Add Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Create Election */}
        <div className="bg-cream rounded-lg p-6 shadow">
          <h2 className="font-poppins text-xl font-bold mb-4">Create New Election</h2>
          <input
            className="w-full mb-2 p-2 border rounded"
            type="text"
            placeholder="Election Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <select
            className="w-full mb-4 p-2 border rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <button
            className="px-4 py-2 bg-chart-purple text-black rounded"
            onClick={createElection}
          >
            Create Election
          </button>
        </div>

        {/* Add Candidate */}
        <div className="bg-cream rounded-lg p-6 shadow">
          <h2 className="font-poppins text-xl font-bold mb-4">Add Candidate</h2>
          <select
            className="w-full mb-2 p-2 border rounded"
            value={selectedElectionId}
            onChange={(e) => setSelectedElectionId(e.target.value)}
          >
            <option value="">Select Election</option>
            {elections.map((e) => (
              <option key={e.id.toString()} value={e.id.toString()}>
                {e.title} ({e.category})
              </option>
            ))}
          </select>
          <input
            className="w-full mb-4 p-2 border rounded"
            type="text"
            placeholder="Candidate Name"
            value={candidateName}
            onChange={(e) => setCandidateName(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-chart-purple text-black rounded"
            onClick={addCandidate}
          >
            Create Candidate
          </button>
        </div>

        {/* Open Voting */}
        <div className="bg-cream rounded-lg p-6 shadow">
          <h2 className="font-poppins text-xl font-bold mb-4">Open Voting</h2>
          <select
            className="w-full mb-2 p-2 border rounded"
            value={openId}
            onChange={(e) => setOpenId(e.target.value)}
          >
            <option value="">Select Election (Closed Only)</option>
            {elections
              .filter((e) => !e.isOpen)
              .map((e) => (
                <option key={e.id.toString()} value={e.id.toString()}>
                  {e.title} ({e.category})
                </option>
              ))}
          </select>
          <input
            className="w-full mb-4 p-2 border rounded"
            type="number"
            placeholder="Durasi Voting (jam)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-chart-purple text-black rounded"
            onClick={() => openVoting(openId)}
          >
            Open Voting (Durasi per Jam)
          </button>
        </div>
      </div>

      {/* Manage & Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Manage Elections */}
        <div className="bg-cream rounded-lg p-6 shadow space-y-4">
          <h2 className="font-poppins text-xl font-bold">Manage Elections</h2>
          <select
            className="w-full mb-2 p-2 border rounded"
            value={selectedFilterCategory}
            onChange={(e) => setSelectedFilterCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {filtered.length === 0 ? (
            <p>No elections found.</p>
          ) : (
            <ul className="space-y-2">
              {filtered.map((e) => (
                <li key={e.id.toString()} className="flex justify-between items-center">
                  <div>
                    <strong>{e.title}</strong> <span>({e.category})</span>{" "}
                    <em>[{e.isOpen ? "Open" : "Closed"}]</em>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Election Results */}
        <div className="bg-cream rounded-lg p-6 shadow">
          <h2 className="font-poppins text-xl font-bold mb-4">Election Results</h2>
          <select
            className="w-full mb-4 p-2 border rounded"
            value={selectedResultId}
            onChange={(e) => setSelectedResultId(e.target.value)}
          >
            <option value="">Select Election</option>
            {elections.map((e) => (
              <option key={e.id.toString()} value={e.id.toString()}>
                {e.title}
              </option>
            ))}
          </select>
          {results.length > 0 && (
            <ResponsiveContainer width="100%" height={250}>
              <RePieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="label"
                  outerRadius={80}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(2)}%`
                  }
                >
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value}%`, name]} />
                <Legend
                  layout="horizontal"
                  align="center"
                  verticalAlign="bottom"
                  formatter={(value) => value}
                />
              </RePieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {candidateStats.map(([cat, candCount]) => {
          const voter = voterStats.find(([c]) => c === cat);
          return (
            <StatsCard
              key={cat}
              title={cat}
              value={candCount.toString()}
              subtitle={`Voters: ${voter ? voter[1] : 0}`}
              icon={<></>}
            />
          );
        })}
      </div>
    </DashboardLayout>
  );
}
