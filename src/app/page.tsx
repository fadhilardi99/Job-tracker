"use client";

import React, { useState, useMemo } from "react";
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
  Mic,
  Award,
  XCircle,
} from "lucide-react";

const navTabs = [
  { label: "Dashboard", icon: <BarChart2 size={16} />, value: "dashboard" },
  { label: "Add Job", icon: <Plus size={16} />, value: "add" },
  { label: "All Jobs", icon: <List size={16} />, value: "list" },
];

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: string;
}

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
    setActiveTab("add");
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this job?")) {
      await deleteJob(id);
    }
  };

  const handleCloseForm = () => {
    setEditingJob(null);
  };

  const statusCounts = useMemo(() => {
    return {
      all: jobs.length,
      applied: jobs.filter((job) => job.status === "applied").length,
      interview: jobs.filter((job) => job.status === "interview").length,
      offer: jobs.filter((job) => job.status === "offer").length,
      rejected: jobs.filter((job) => job.status === "rejected").length,
    };
  }, [jobs]);

  // For status distribution progress bar
  const statusList = [
    { label: "Applied", value: statusCounts.applied, color: "bg-blue-500" },
    {
      label: "Interview",
      value: statusCounts.interview,
      color: "bg-yellow-500",
    },
    { label: "Offer", value: statusCounts.offer, color: "bg-green-500" },
    { label: "Rejected", value: statusCounts.rejected, color: "bg-red-500" },
  ];

  const latestJobs = useMemo(() => {
    return [...jobs]
      .sort(
        (a, b) =>
          new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime()
      )
      .slice(0, 5);
  }, [jobs]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600 font-medium">Loading applications...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 rounded-lg p-2">
                <Briefcase size={22} className="text-white" />
              </div>
              <h1 className="text-xl font-bold">JobTracker</h1>
            </div>
            <div className="text-sm font-medium text-blue-100">
              {statusCounts.all} Total Applications
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-4">
            {navTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => {
                  setActiveTab(tab.value);
                  if (tab.value !== "add") setEditingJob(null);
                }}
                className={`flex items-center space-x-2 py-3 px-3 my-1 rounded-md font-semibold text-sm transition-all duration-200 ${
                  activeTab === tab.value
                    ? "bg-primary/10 text-primary"
                    : "text-text-secondary hover:bg-gray-100"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              <StatCard
                icon={<Briefcase size={28} className="text-blue-800" />}
                label="Applied"
                value={statusCounts.applied}
                color="bg-blue-400 text-white"
              />
              <StatCard
                icon={<Mic size={28} className="text-yellow-800" />}
                label="Interview"
                value={statusCounts.interview}
                color="bg-yellow-400 text-white"
              />
              <StatCard
                icon={<Award size={28} className="text-green-800" />}
                label="Offer"
                value={statusCounts.offer}
                color="bg-green-500 text-white"
              />
              <StatCard
                icon={<XCircle size={28} className="text-red-800" />}
                label="Rejected"
                value={statusCounts.rejected}
                color="bg-red-500 text-white"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white rounded-lg border border-card-border shadow-sm">
                <div className="p-6 border-b border-card-border">
                  <h3 className="text-lg font-bold text-text-primary">
                    Status Distribution
                  </h3>
                </div>
                <div className="p-6 space-y-4">
                  {statusList.map((status) => (
                    <div key={status.label}>
                      <div className="flex justify-between text-sm font-medium text-text-secondary mb-1">
                        <span>{status.label}</span>
                        <span>
                          {status.value} / {statusCounts.all}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`${status.color} h-2 rounded-full`}
                          style={{
                            width: `${
                              statusCounts.all > 0
                                ? (status.value / statusCounts.all) * 100
                                : 0
                            }%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg border border-card-border shadow-sm">
                <div className="p-6 border-b border-card-border">
                  <h3 className="text-lg font-bold text-text-primary">
                    Recent Applications
                  </h3>
                </div>
                {latestJobs.length === 0 ? (
                  <p className="text-text-secondary text-center py-8 px-6">
                    No recent applications.
                  </p>
                ) : (
                  <div className="p-4 space-y-2">
                    {latestJobs.map((job) => (
                      <div
                        key={job.id}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50"
                      >
                        <div>
                          <p className="font-semibold text-text-primary">
                            {job.position}
                          </p>
                          <p className="text-sm text-text-secondary">
                            {job.company}
                          </p>
                        </div>
                        <span className="text-xs text-text-muted">
                          {new Date(job.appliedDate).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {(activeTab === "add" || editingJob) && (
          <JobForm
            onSubmit={handleSubmit}
            onClose={() => {
              handleCloseForm();
              setActiveTab("list");
            }}
            initialData={editingJob || undefined}
          />
        )}

        {activeTab === "list" && !editingJob && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-card-border p-4 shadow-sm">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="Search by company or position..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-card-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  />
                </div>
                <div className="relative">
                  <Filter
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted"
                    size={18}
                  />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full sm:w-auto pl-10 pr-8 py-2 border border-card-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors appearance-none"
                  >
                    <option value="all">All Status</option>
                    <option value="applied">Applied</option>
                    <option value="interview">Interview</option>
                    <option value="offer">Offer</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>
            </div>

            {filteredJobs.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg border border-card-border p-12 text-center shadow-sm">
                <Briefcase size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  No Applications Found
                </h3>
                <p className="text-text-secondary mb-6">
                  Your job list is empty or no jobs match your filters.
                </p>
                <button
                  onClick={() => setActiveTab("add")}
                  className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-primary-dark transition-colors font-semibold"
                >
                  Add Your First Job
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, color }) => (
  <div
    className={`p-5 rounded-lg shadow-sm flex items-center space-x-4 ${color}`}
  >
    <div className="bg-white/30 p-3 rounded-lg">{icon}</div>
    <div>
      <p className="text-sm font-medium opacity-80">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);
