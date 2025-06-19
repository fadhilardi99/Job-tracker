"use client";

import React, { useState } from "react";
import { useJobs } from "../hooks/useJobs";
import { JobForm } from "../components/JobForm";
import { JobCard } from "../components/JobCard";
import { Job } from "../types/job";
import {
  Plus,
  Search,
  Filter,
  Briefcase,
  List,
  BarChart2,
  CheckCircle2,
} from "lucide-react";

const navTabs = [
  { label: "Dashboard", icon: <BarChart2 size={18} />, value: "dashboard" },
  { label: "Tambah", icon: <Plus size={18} />, value: "add" },
  { label: "Daftar", icon: <List size={18} />, value: "list" },
];

export default function Home() {
  const { jobs, loading, addJob, updateJob, deleteJob } = useJobs();
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [activeTab, setActiveTab] = useState("dashboard");

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSubmit = async (
    jobData: Omit<Job, "id" | "createdAt" | "updatedAt">
  ) => {
    if (editingJob && editingJob.id) {
      await updateJob(editingJob.id, jobData);
    } else {
      await addJob(jobData);
    }
    setEditingJob(null);
  };

  const handleEdit = (job: Job) => {
    setEditingJob(job);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this job?")) {
      await deleteJob(id);
    }
  };

  const handleCloseForm = () => {
    setEditingJob(null);
  };

  const statusCounts = {
    all: jobs.length,
    applied: jobs.filter((job) => job.status === "applied").length,
    interview: jobs.filter((job) => job.status === "interview").length,
    offer: jobs.filter((job) => job.status === "offer").length,
    rejected: jobs.filter((job) => job.status === "rejected").length,
  };

  const successRate =
    statusCounts.all > 0
      ? ((statusCounts.offer / statusCounts.all) * 100).toFixed(1)
      : "0.0";

  // For status distribution progress bar
  const statusList = [
    { label: "Dilamar", value: statusCounts.applied, color: "bg-blue-500" },
    {
      label: "Interview",
      value: statusCounts.interview,
      color: "bg-yellow-500",
    },
    { label: "Tawaran", value: statusCounts.offer, color: "bg-green-500" },
    { label: "Ditolak", value: statusCounts.rejected, color: "bg-red-500" },
  ];

  // Latest jobs (sorted by appliedDate desc)
  const latestJobs = [...jobs]
    .sort(
      (a, b) =>
        new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime()
    )
    .slice(0, 3);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg font-bold">Loading jobs...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f8fc]">
      {/* Header */}
      <header className="w-full bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 rounded-lg p-2 flex items-center justify-center">
            <Briefcase size={28} className="text-white" />
          </div>
          <div>
            <div className="text-xl font-bold text-gray-900 leading-tight">
              JobTracker
            </div>
            <div className="text-xs text-gray-500">
              Kelola lamaran kerja Anda
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="flex justify-center mt-6 mb-8">
        <div className="flex gap-2 bg-white rounded-lg shadow px-2 py-1">
          {navTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`flex items-center gap-1 px-4 py-2 rounded-md font-medium text-sm transition-all ${
                activeTab === tab.value
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Dashboard Content */}
      {activeTab === "dashboard" && (
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Stat Cards */}
          <div className="col-span-1 md:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
            <div className="rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 shadow flex flex-col gap-2 relative overflow-hidden">
              <div className="flex items-center gap-2 text-lg font-semibold">
                <BarChart2 size={22} /> Total Lamaran
              </div>
              <div className="text-3xl font-bold">{statusCounts.all}</div>
              <div className="text-xs">Semua aplikasi</div>
              <div className="absolute right-4 top-4">
                <BarChart2 size={40} />
              </div>
            </div>
            <div className="rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-500 text-white p-6 shadow flex flex-col gap-2 relative overflow-hidden">
              <div className="flex items-center gap-2 text-lg font-semibold">
                <Filter size={22} /> Interview
              </div>
              <div className="text-3xl font-bold">{statusCounts.interview}</div>
              <div className="text-xs">Tahap interview</div>
              <div className="absolute right-4 top-4">
                <Filter size={40} />
              </div>
            </div>
            <div className="rounded-xl bg-gradient-to-r from-green-400 to-green-500 text-white p-6 shadow flex flex-col gap-2 relative overflow-hidden">
              <div className="flex items-center gap-2 text-lg font-semibold">
                <CheckCircle2 size={22} /> Tawaran
              </div>
              <div className="text-3xl font-bold">{statusCounts.offer}</div>
              <div className="text-xs">Job offers</div>
              <div className="absolute right-4 top-4">
                <CheckCircle2 size={40} />
              </div>
            </div>
            <div className="rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 shadow flex flex-col gap-2 relative overflow-hidden">
              <div className="flex items-center gap-2 text-lg font-semibold">
                <BarChart2 size={22} /> Success Rate
              </div>
              <div className="text-3xl font-bold">{successRate}%</div>
              <div className="text-xs">Tingkat keberhasilan</div>
              <div className="absolute right-4 top-4">
                <BarChart2 size={40} />
              </div>
            </div>
          </div>

          {/* Status Distribution */}
          <div className="rounded-xl p-6  flex flex-col gap-4 bg-white border border-gray-200 text-black">
            <div className="flex items-center gap-2 text-lg font-semibold mb-2">
              <BarChart2 size={20} /> Distribusi Status
            </div>
            {statusList.map((s) => (
              <div key={s.label} className="mb-2">
                <div className="flex justify-between text-sm font-medium mb-1">
                  <span className="text-gray-900 font-bold">{s.label}</span>
                  <span className="text-gray-900 font-bold">{s.value}</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`${s.color} h-2 rounded-full`}
                    style={{
                      width: `${
                        statusCounts.all > 0
                          ? (s.value / statusCounts.all) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Latest Applications */}
          <div className="rounded-xl bg-white p-6 shadow flex flex-col gap-4 text-black">
            <div className="flex items-center gap-2 text-lg font-semibold mb-2">
              <List size={20} /> Lamaran Terbaru
            </div>
            {latestJobs.length === 0 ? (
              <div className="text-gray-500 text-center py-8">
                Belum ada lamaran
              </div>
            ) : (
              <ul className="divide-y divide-gray-100">
                {latestJobs.map((job) => (
                  <li key={job.id} className="py-3">
                    <div className="font-semibold text-gray-900">
                      {job.position}
                    </div>
                    <div className="text-sm text-gray-600">
                      {job.company} &middot;{" "}
                      {new Date(job.appliedDate).toLocaleDateString()}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {/* Add Tab (Job Form) */}
      {activeTab === "add" && (
        <div className="max-w-xl mx-auto mt-10">
          <JobForm
            onSubmit={handleSubmit}
            onClose={() => setActiveTab("dashboard")}
            initialData={editingJob || undefined}
          />
        </div>
      )}

      {/* List Tab (All Jobs) */}
      {activeTab === "list" && (
        <div className="max-w-7xl mx-auto px-4 py-10 text-black">
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black"
                size={20}
              />
              <input
                type="text"
                placeholder="Search companies or positions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg shadow focus:ring-2 focus:ring-primary focus:border-transparent bg-white/80 backdrop-blur-md transition text-black"
              />
            </div>
            <div className="relative">
              <Filter
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-200 rounded-lg shadow focus:ring-2 focus:ring-primary focus:border-transparent bg-white/80 backdrop-blur-md transition"
              >
                <option value="all">All Status</option>
                <option value="applied">Applied</option>
                <option value="interview">Interview</option>
                <option value="offer">Offer</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <button
              onClick={() => setActiveTab("add")}
              className="text-black bg-gradient-to-r from-primary to-primary-dark  px-6 py-2 rounded-lg shadow-lg hover:scale-105 hover:from-primary-dark hover:to-primary transition-all flex items-center gap-2 font-semibold text-lg"
            >
              <Plus size={22} />
              Tambah
            </button>
          </div>
          {editingJob ? (
            <JobForm
              onSubmit={handleSubmit}
              onClose={handleCloseForm}
              initialData={editingJob || undefined}
            />
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-16 animate-fade-in">
              <div className="text-gray-500 mb-4 text-lg">
                {jobs.length === 0
                  ? "No jobs added yet"
                  : "No jobs match your filters"}
              </div>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 animate-fade-in">
              {filteredJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
