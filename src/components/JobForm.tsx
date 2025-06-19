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
    <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl p-8 max-w-2xl mx-auto animate-fade-in">
      <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
        <Briefcase size={28} className="text-primary" />
        <h2 className="text-2xl font-black text-gray-900">
          {initialData ? "Edit Job" : "Tambah Lamaran"}
        </h2>
      </div>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-gray-600">
            Perusahaan *
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg font-bold text-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-gray-600">Posisi *</label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg font-bold text-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-gray-600">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg font-bold text-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
          >
            <option value="applied">Dilamar</option>
            <option value="interview">Interview</option>
            <option value="offer">Tawaran</option>
            <option value="rejected">Ditolak</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-gray-600">
            Tanggal Lamar *
          </label>
          <input
            type="date"
            name="appliedDate"
            value={formData.appliedDate}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg font-bold text-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-gray-600">Lokasi *</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg font-bold text-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-gray-600">Gaji</label>
          <input
            type="text"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            placeholder="cth: Rp10.000.000"
            className="w-full p-3 border border-gray-300 rounded-lg font-bold text-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
          />
        </div>
        <div className="flex flex-col gap-2 md:col-span-2">
          <label className="text-xs font-bold text-gray-600">
            URL Lowongan
          </label>
          <input
            type="url"
            name="jobUrl"
            value={formData.jobUrl}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg font-bold text-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
          />
        </div>
        <div className="flex flex-col gap-2 md:col-span-2">
          <label className="text-xs font-bold text-gray-600">Catatan</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            className="w-full p-3 border border-gray-300 rounded-lg font-bold text-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
          />
        </div>
        <div className="flex gap-3 md:col-span-2 pt-2">
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-primary to-primary-dark text-white py-3 px-4 rounded-lg shadow-lg hover:scale-105 hover:from-primary-dark hover:to-primary transition-all font-black text-lg"
          >
            {initialData ? "Update" : "Tambah"} Lamaran
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors font-bold text-lg shadow"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
};
