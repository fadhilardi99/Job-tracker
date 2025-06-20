"use client";

import React, { useState, useMemo } from "react";
import { useJobs } from "../hooks/useJobs";
import { JobForm } from "../components/JobForm";
import { JobCard } from "../components/JobCard";
import { Job } from "../types/job";
import {
  Briefcase,
  Plus,
  LayoutGrid,
  List,
  Mic,
  Award,
  XCircle,
} from "lucide-react";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: string;
}

export default function Home() {
  const { jobs, loading, addJob, updateJob, deleteJob } = useJobs();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [editingJob, setEditingJob] = useState<Job | null>(null);

  const statusCounts = useMemo(() => {
    return {
      all: jobs.length,
      applied: jobs.filter((job) => job.status === "applied").length,
      interview: jobs.filter((job) => job.status === "interview").length,
      offer: jobs.filter((job) => job.status === "offer").length,
      rejected: jobs.filter((job) => job.status === "rejected").length,
    };
  }, [jobs]);

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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const navTabs = [
    {
      value: "dashboard",
      label: "Dashboard",
      icon: <LayoutGrid size={18} />,
    },
    {
      value: "add",
      label: "Add",
      icon: <Plus size={18} />,
    },
    {
      value: "list",
      label: "List",
      icon: <List size={18} />,
    },
  ];

  const statusList = [
    {
      label: "Applied",
      value: statusCounts.applied,
      color: "bg-blue-500",
      percentage:
        statusCounts.all > 0
          ? (statusCounts.applied / statusCounts.all) * 100
          : 0,
    },
    {
      label: "Interview",
      value: statusCounts.interview,
      color: "bg-yellow-500",
      percentage:
        statusCounts.all > 0
          ? (statusCounts.interview / statusCounts.all) * 100
          : 0,
    },
    {
      label: "Offer",
      value: statusCounts.offer,
      color: "bg-green-500",
      percentage:
        statusCounts.all > 0
          ? (statusCounts.offer / statusCounts.all) * 100
          : 0,
    },
    {
      label: "Rejected",
      value: statusCounts.rejected,
      color: "bg-red-500",
      percentage:
        statusCounts.all > 0
          ? (statusCounts.rejected / statusCounts.all) * 100
          : 0,
    },
  ];

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
              <h1 className="text-xl font-bold text-white">JobTracker</h1>
            </div>
            <div className="text-sm font-medium text-white">
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
                    : "text-gray-700 hover:bg-gray-100"
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
                  <h3 className="text-lg font-bold text-gray-900">
                    Status Distribution
                  </h3>
                </div>
                <div className="p-6 space-y-4">
                  {statusList.map((status) => (
                    <div key={status.label}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-900">
                          {status.label}
                        </span>
                        <span className="text-sm text-gray-700">
                          {status.value} / {statusCounts.all}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${status.color}`}
                          style={{ width: `${status.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg border border-card-border shadow-sm">
                <div className="p-6 border-b border-card-border">
                  <h3 className="text-lg font-bold text-gray-900">
                    Recent Applications
                  </h3>
                </div>
                {latestJobs.length === 0 ? (
                  <p className="text-gray-600 text-center py-8 px-6">
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
                          <p className="text-sm font-medium text-gray-900">
                            {job.position}
                          </p>
                          <p className="text-xs text-gray-600">{job.company}</p>
                        </div>
                        <span className="text-xs text-gray-500">
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

        {activeTab === "add" && (
          <div className="max-w-3xl mx-auto">
            <JobForm
              onSubmit={
                editingJob
                  ? (jobData) => updateJob(editingJob.id!, jobData)
                  : addJob
              }
              onClose={() => {
                setEditingJob(null);
                setActiveTab("dashboard");
              }}
              initialData={editingJob || undefined}
            />
          </div>
        )}

        {activeTab === "list" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                All Applications
              </h2>
              <button
                onClick={() => setActiveTab("add")}
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors font-semibold flex items-center space-x-2"
              >
                <Plus size={16} />
                <span>Add New</span>
              </button>
            </div>

            {jobs.length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-gray-100 rounded-full p-6 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                  <Briefcase size={32} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No applications yet
                </h3>
                <p className="text-gray-600 mb-4">
                  Start tracking your job applications
                </p>
                <button
                  onClick={() => setActiveTab("add")}
                  className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors font-semibold"
                >
                  Add Your First Application
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onEdit={(job) => {
                      setEditingJob(job);
                      setActiveTab("add");
                    }}
                    onDelete={deleteJob}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
