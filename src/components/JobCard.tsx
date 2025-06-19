import React from "react";
import { Job } from "../types/job";
import {
  MapPin,
  Calendar,
  DollarSign,
  ExternalLink,
  Edit,
  Trash2,
  Briefcase,
} from "lucide-react";

interface JobCardProps {
  job: Job;
  onEdit: (job: Job) => void;
  onDelete: (id: string) => void;
}

const statusColors = {
  applied: "border-l-8 border-blue-500 bg-blue-50",
  interview: "border-l-8 border-yellow-500 bg-yellow-50",
  offer: "border-l-8 border-green-500 bg-green-50",
  rejected: "border-l-8 border-red-500 bg-red-50",
};

const statusBadge = {
  applied: "bg-blue-600 text-white",
  interview: "bg-yellow-500 text-white",
  offer: "bg-green-600 text-white",
  rejected: "bg-red-600 text-white",
};

const statusLabels = {
  applied: "Dilamar",
  interview: "Interview",
  offer: "Tawaran",
  rejected: "Ditolak",
};

export const JobCard: React.FC<JobCardProps> = ({ job, onEdit, onDelete }) => {
  return (
    <div
      className={`rounded-2xl shadow-2xl border border-gray-200 p-7 mb-2 flex flex-col gap-4 transition-all duration-200 hover:scale-[1.02] hover:shadow-3xl ${
        statusColors[job.status]
      }`}
    >
      <div className="flex items-center gap-3 mb-2">
        <Briefcase size={28} className="text-black" />
        <div>
          <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-1">
            {job.position}
          </h3>
          <p className="text-gray-700 text-lg font-bold">{job.company}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 mb-2">
        <div className="flex items-center gap-2 text-base text-gray-700 font-bold">
          <MapPin size={16} />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-2 text-base text-gray-700 font-bold">
          <Calendar size={16} />
          <span>{new Date(job.appliedDate).toLocaleDateString()}</span>
        </div>
        {job.salary && (
          <div className="flex items-center gap-2 text-base text-gray-700 font-bold">
            <DollarSign size={16} />
            <span>{job.salary}</span>
          </div>
        )}
        {job.jobUrl && (
          <div className="flex items-center gap-2 text-base font-bold text-black">
            <ExternalLink size={16} />
            <a
              href={job.jobUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-dark underline"
            >
              Lihat Lowongan
            </a>
          </div>
        )}
      </div>
      <div className="flex items-center gap-3">
        <span
          className={`px-4 py-1 rounded-full text-base font-black shadow-sm transition-all duration-200 ${
            statusBadge[job.status]
          }`}
        >
          {statusLabels[job.status]}
        </span>
        <div className="flex gap-2 ml-auto text-black">
          <button
            onClick={() => onEdit(job)}
            className="p-2 text-primary hover:bg-primary/10 hover:text-primary-dark rounded-lg transition-colors shadow text-lg font-black"
            title="Edit"
          >
            <Edit size={20} />
          </button>
          <button
            onClick={() => job.id && onDelete(job.id)}
            className="p-2 text-danger hover:bg-danger/10 hover:text-danger rounded-lg transition-colors shadow text-lg font-black"
            title="Delete"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
      {job.notes && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
          <p className="text-base text-gray-700 italic font-bold">
            {job.notes}
          </p>
        </div>
      )}
    </div>
  );
};
