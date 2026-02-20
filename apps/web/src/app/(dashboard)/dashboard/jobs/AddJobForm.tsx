"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const inputCls = "px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm";

export function AddJobForm() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [mode, setMode] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [skills, setSkills] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await fetch("/api/v1/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        company,
        url: url || undefined,
        description: description || undefined,
        location: location || undefined,
        mode: mode || undefined,
        experienceLevel: experienceLevel || undefined,
        skills: skills
          ? skills.split(",").map((s) => s.trim()).filter(Boolean)
          : undefined,
      }),
    });
    const data = await res.json().catch(() => ({}));
    setLoading(false);
    if (!res.ok) {
      setError(data.error ?? "Failed to add job");
      return;
    }
    setTitle("");
    setCompany("");
    setUrl("");
    setDescription("");
    setLocation("");
    setMode("");
    setExperienceLevel("");
    setSkills("");
    setOpen(false);
    window.location.reload();
  }

  return (
    <div>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm font-medium mb-4"
        >
          + Add Job
        </button>
      )}

      {open && (
        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-4 space-y-3 mb-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Add Job</h2>
            <button type="button" onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600 text-lg leading-none">&times;</button>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input type="text" placeholder="Job title *" value={title} onChange={(e) => setTitle(e.target.value)} required className={inputCls} />
            <input type="text" placeholder="Company *" value={company} onChange={(e) => setCompany(e.target.value)} required className={inputCls} />
            <input type="url" placeholder="Job URL" value={url} onChange={(e) => setUrl(e.target.value)} className={inputCls} />
            <input type="text" placeholder="Location (e.g. San Francisco)" value={location} onChange={(e) => setLocation(e.target.value)} className={inputCls} />
            <select value={mode} onChange={(e) => setMode(e.target.value)} className={cn(inputCls, "bg-white")}>
              <option value="">Work Mode</option>
              <option value="remote">Remote</option>
              <option value="hybrid">Hybrid</option>
              <option value="onsite">On-site</option>
            </select>
            <select value={experienceLevel} onChange={(e) => setExperienceLevel(e.target.value)} className={cn(inputCls, "bg-white")}>
              <option value="">Experience Level</option>
              <option value="junior">Junior</option>
              <option value="mid">Mid-level</option>
              <option value="senior">Senior</option>
              <option value="lead">Lead</option>
            </select>
          </div>

          <input type="text" placeholder="Skills (comma separated)" value={skills} onChange={(e) => setSkills(e.target.value)} className={cn(inputCls, "w-full")} />

          <textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            className={cn(inputCls, "w-full")}
          />

          <div className="flex gap-2">
            <button type="submit" disabled={loading} className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 text-sm">
              {loading ? "Adding..." : "Add Job"}
            </button>
            <button type="button" onClick={() => setOpen(false)} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
