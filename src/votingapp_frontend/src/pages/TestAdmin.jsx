import React from "react";
import { DashboardLayout } from "../components/AdminDashboard/DashboardLayout";
import { StatsCard } from "../components/AdminDashboard/StatsCard";
import { BarChart } from "../components/AdminDashboard/BarChart";
import { PieChart } from "../components/AdminDashboard/PieChart";
import { Users, Vote } from "lucide-react";

// Sample data matching the Figma design
const candidateData = [
  { label: "Praroro", value: 87, maxValue: 100 },
  { label: "Popowi", value: 30, maxValue: 100 },
  { label: "Janggar", value: 51, maxValue: 100 },
];

const pieChartData = [
  { label: "Praroro", value: 86.55, percentage: 51.59, color: "#8979FF" },
  { label: "Janggar", value: 51.21, percentage: 30.52, color: "#3CC3DF" },
  { label: "Popowi", value: 30.02, percentage: 17.89, color: "#FF928A" },
];

const UserIcon = ({ color }) => (
  <svg
    className="h-10 w-10"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 35V31.6667C5 29.8986 5.70238 28.2029 6.95262 26.9526C8.20286 25.7024 9.89856 25 11.6667 25H18.3333C20.1014 25 21.7971 25.7024 23.0474 26.9526C24.2976 28.2029 25 29.8986 25 31.6667V35M26.6667 5.21667C28.1007 5.58384 29.3717 6.41784 30.2794 7.58718C31.1871 8.75653 31.6797 10.1947 31.6797 11.675C31.6797 13.1553 31.1871 14.5935 30.2794 15.7628C29.3717 16.9322 28.1007 17.7662 26.6667 18.1333M35 35V31.6667C34.9915 30.1953 34.4965 28.768 33.5921 27.6073C32.6877 26.4467 31.4247 25.6178 30 25.25M8.33333 11.6667C8.33333 13.4348 9.03571 15.1305 10.286 16.3807C11.5362 17.631 13.2319 18.3333 15 18.3333C16.7681 18.3333 18.4638 17.631 19.714 16.3807C20.9643 15.1305 21.6667 13.4348 21.6667 11.6667C21.6667 9.89856 20.9643 8.20286 19.714 6.95262C18.4638 5.70238 16.7681 5 15 5C13.2319 5 11.5362 5.70238 10.286 6.95262C9.03571 8.20286 8.33333 9.89856 8.33333 11.6667Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const VoteIcon = () => (
  <svg
    className="h-10 w-10"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15 20L18.3333 23.3334L25 16.6667"
      stroke="#725CAD"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.66671 33.3334V10C6.66671 9.11597 7.0179 8.26812 7.64302 7.643C8.26814 7.01788 9.11599 6.66669 10 6.66669H30C30.8841 6.66669 31.7319 7.01788 32.3571 7.643C32.9822 8.26812 33.3334 9.11597 33.3334 10V33.3334M36.6667 33.3334H3.33337"
      stroke="#725CAD"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function Index() {
  return (
    <DashboardLayout>
      {/* Dashboard Title */}
      <div className="mb-6 lg:mb-8">
        <h1 className="font-poppins text-3xl font-bold text-dark-gray lg:text-[40px]">
          Dashboard
        </h1>
      </div>

      {/* Charts Section */}
      <div className="mb-6 flex flex-col gap-6 lg:mb-8 lg:flex-row lg:gap-8">
        {/* Bar Chart */}
        <div className="w-full lg:flex-1">
          <div className="overflow-x-auto">
            <BarChart data={candidateData} />
          </div>
        </div>

        {/* Pie Chart */}
        <div className="w-full lg:flex-shrink-0">
          <div className="overflow-x-auto">
            <PieChart data={pieChartData} />
          </div>
        </div>
      </div>

      {/* Statistics Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6 xl:grid-cols-3">
        {/* Row 1 */}
        <StatsCard
          title="Jumlah Kandidat DPR"
          value="9.917"
          subtitle="Calon Anggota DPR Aktif"
          icon={<UserIcon color="#FE7743" />}
        />

        <StatsCard
          title="Jumlah Kandidat Presiden"
          value="5"
          subtitle="Capres & Cawapres Aktif"
          icon={<UserIcon color="#E14434" />}
        />

        <StatsCard
          title="Presentase Suara Terkumpul"
          value="75,00%"
          subtitle="Suara Yang Terkumpul"
          icon={<VoteIcon />}
        />

        {/* Row 2 */}
        <StatsCard
          title="Jumlah Kandidat DPD"
          value="668"
          subtitle="Calon Anggota DPD Aktif"
          icon={<UserIcon color="#F7AD45" />}
        />

        <StatsCard
          title="Jumlah Penduduk Terdaftar"
          value="300.000.000"
          subtitle="Berdasarkan Data 2024"
          icon={<UserIcon color="#FE7743" />}
          className="lg:col-span-2 xl:col-span-1"
        />
      </div>
    </DashboardLayout>
  );
}
