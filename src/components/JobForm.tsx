import React, { useState } from "react";
import { Job } from "../types/job";
import { Briefcase } from "lucide-react";

interface JobFormProps {
  onSubmit: (job: Omit<Job, "id" | "createdAt" | "updatedAt">) => void;
  onClose: () => void;
  initialData?: Job;
}

export const JobForm: React.FC<JobFormProps> = ({
  onSubmit,
  onClose,
  initialData,
}) => {
  const [formData, setFormData] = useState({
    company: initialData?.company || "",
    position: initialData?.position || "",
    status: initialData?.status || ("applied" as const),
    appliedDate:
      initialData?.appliedDate || new Date().toISOString().split("T")[0],
    salary: initialData?.salary || "",
    location: initialData?.location || "",
    jobUrl: initialData?.jobUrl || "",
    notes: initialData?.notes || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-white rounded-lg border border-card-border p-8 shadow-sm max-w-3xl mx-auto">
      <div className="flex items-center space-x-4 mb-8 pb-4 border-b border-gray-200">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-3 shadow-md">
          <Briefcase size={24} className="text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-text-primary">
            {initialData ? "Edit Application" : "Add New Application"}
          </h2>
          <p className="text-text-secondary">Fill in the details below.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-text-secondary mb-2">
              Company Name *
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-card-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-gray-50 focus:bg-white transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-text-secondary mb-2">
              Job Position *
            </label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-card-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-gray-50 focus:bg-white transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-text-secondary mb-2">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-card-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-gray-50 focus:bg-white transition-colors"
            >
              <option value="applied" className="text-blue-600">
                Applied
              </option>
              <option value="interview" className="text-yellow-600">
                Interview
              </option>
              <option value="offer" className="text-green-600">
                Offer
              </option>
              <option value="rejected" className="text-red-600">
                Rejected
              </option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-text-secondary mb-2">
              Date Applied *
            </label>
            <input
              type="date"
              name="appliedDate"
              value={formData.appliedDate}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-card-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-gray-50 focus:bg-white transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-text-secondary mb-2">
              Location *
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-card-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-gray-50 focus:bg-white transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-text-secondary mb-2">
              Salary Range
            </label>
            <input
              type="text"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-card-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-gray-50 focus:bg-white transition-colors"
              placeholder="e.g., $80,000 - $100,000"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-text-secondary mb-2">
            Job Posting URL
          </label>
          <input
            type="url"
            name="jobUrl"
            value={formData.jobUrl}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-card-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-gray-50 focus:bg-white transition-colors"
            placeholder="https://company.com/careers/job-id"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-text-secondary mb-2">
            Notes
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border border-card-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-gray-50 focus:bg-white transition-colors"
            placeholder="Add notes about the role, interview, etc."
          />
        </div>

        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-100">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-100 text-text-secondary py-2 px-5 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-5 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-semibold shadow-md hover:shadow-lg"
          >
            {initialData ? "Save Changes" : "Save Application"}
          </button>
        </div>
      </form>
    </div>
  );
};
