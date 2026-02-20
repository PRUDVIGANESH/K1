"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface Preferences {
  roleKeywords: string[];
  preferredLocations: string[];
  preferredMode: string;
  experienceLevel: string;
  skills: string[];
  minMatchScore: number;
}

const inputCls = "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none";
const labelCls = "block text-sm font-medium text-gray-700 mb-1";

export function PreferencesForm({
  initialPreferences,
}: {
  initialPreferences: Preferences | null;
}) {
  const [prefs, setPrefs] = useState<Preferences>(
    initialPreferences ?? {
      roleKeywords: [],
      preferredLocations: [],
      preferredMode: "",
      experienceLevel: "",
      skills: [],
      minMatchScore: 0,
    }
  );
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  function updateArray(field: keyof Preferences, value: string) {
    setPrefs((prev) => ({
      ...prev,
      [field]: value
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/v1/user/preferences", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(prefs),
      });
      if (res.ok) {
        setMessage("Preferences saved!");
      } else {
        setMessage("Failed to save preferences.");
      }
    } catch {
      setMessage("Failed to save preferences.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
        <h2 className="font-semibold text-gray-900">Job Matching Preferences</h2>
        <p className="text-sm text-gray-500">
          These preferences are used to calculate match scores for jobs in your tracker.
        </p>

        <div>
          <label className={labelCls}>Role Keywords (comma separated)</label>
          <input
            type="text"
            className={inputCls}
            value={prefs.roleKeywords.join(", ")}
            onChange={(e) => updateArray("roleKeywords", e.target.value)}
            placeholder="Software Engineer, Frontend Developer, React..."
          />
          <p className="text-xs text-gray-400 mt-1">Keywords used to match job titles</p>
        </div>

        <div>
          <label className={labelCls}>Preferred Locations (comma separated)</label>
          <input
            type="text"
            className={inputCls}
            value={prefs.preferredLocations.join(", ")}
            onChange={(e) => updateArray("preferredLocations", e.target.value)}
            placeholder="San Francisco, New York, Remote..."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Preferred Work Mode</label>
            <select
              value={prefs.preferredMode}
              onChange={(e) => setPrefs((p) => ({ ...p, preferredMode: e.target.value }))}
              className={cn(inputCls, "bg-white")}
            >
              <option value="">Any</option>
              <option value="remote">Remote</option>
              <option value="hybrid">Hybrid</option>
              <option value="onsite">On-site</option>
            </select>
          </div>

          <div>
            <label className={labelCls}>Experience Level</label>
            <select
              value={prefs.experienceLevel}
              onChange={(e) => setPrefs((p) => ({ ...p, experienceLevel: e.target.value }))}
              className={cn(inputCls, "bg-white")}
            >
              <option value="">Any</option>
              <option value="junior">Junior</option>
              <option value="mid">Mid-level</option>
              <option value="senior">Senior</option>
              <option value="lead">Lead</option>
            </select>
          </div>
        </div>

        <div>
          <label className={labelCls}>Skills (comma separated)</label>
          <textarea
            className={inputCls}
            rows={3}
            value={prefs.skills.join(", ")}
            onChange={(e) => updateArray("skills", e.target.value)}
            placeholder="TypeScript, React, Node.js, PostgreSQL..."
          />
          <p className="text-xs text-gray-400 mt-1">Used to match job skill requirements</p>
        </div>

        <div>
          <label className={labelCls}>Minimum Match Score: {prefs.minMatchScore}%</label>
          <input
            type="range"
            min={0}
            max={100}
            step={5}
            value={prefs.minMatchScore}
            onChange={(e) => setPrefs((p) => ({ ...p, minMatchScore: Number(e.target.value) }))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>0% (show all)</span>
            <span>100% (perfect match)</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 text-sm font-medium"
        >
          {saving ? "Saving..." : "Save Preferences"}
        </button>
        {message && (
          <span className={cn("text-sm", message.includes("saved") ? "text-green-600" : "text-red-600")}>
            {message}
          </span>
        )}
      </div>
    </form>
  );
}
