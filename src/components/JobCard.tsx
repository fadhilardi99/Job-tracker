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

const statusBadge = {
  applied: "bg-gradient-to-r from-blue-400 to-blue-500 text-white",
  interview: "bg-gradient-to-r from-yellow-400 to-yellow-500 text-white",
  offer: "bg-gradient-to-r from-green-400 to-green-500 text-white",
  rejected: "bg-gradient-to-r from-red-400 to-red-500 text-white",
};

const statusLabels = {
  applied: "Applied",
  interview: "Interview",
  offer: "Offer",
  rejected: "Rejected",
};

export const JobCard: React.FC<JobCardProps> = ({ job, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg border border-card-border p-5 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col hover:border-blue-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-3 shadow-sm">
            <Briefcase size={20} className="text-white" />
          </div>
          <div>
            <h3 className="text-md font-bold text-gray-900 leading-tight">
              {job.position}
            </h3>
            <p className="text-sm text-gray-700">{job.company}</p>
          </div>
        </div>
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap shadow-sm ${
            statusBadge[job.status]
          }`}
        >
          {statusLabels[job.status]}
        </span>
      </div>

      {/* Details */}
      <div className="space-y-3 text-sm text-gray-600 mb-4 flex-grow">
        <div className="flex items-center space-x-2">
          <MapPin size={14} className="flex-shrink-0 text-blue-500" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar size={14} className="flex-shrink-0 text-green-500" />
          <span>
            Applied on {new Date(job.appliedDate).toLocaleDateString()}
          </span>
        </div>
        {job.salary && (
          <div className="flex items-center space-x-2">
            <DollarSign size={14} className="flex-shrink-0 text-yellow-500" />
            <span>{job.salary}</span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        {job.jobUrl ? (
          <a
            href={job.jobUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-sm text-blue-600 hover:underline hover:text-blue-700 transition-colors"
          >
            <ExternalLink size={14} />
            <span>View Post</span>
          </a>
        ) : (
          <div />
        )}
        <div className="flex space-x-1">
          <button
            onClick={() => onEdit(job)}
            className="p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-md transition-all duration-200"
            title="Edit"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => job.id && onDelete(job.id)}
            className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-md transition-all duration-200"
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
