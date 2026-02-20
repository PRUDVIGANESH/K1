"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { JobStatus } from "@kodnest/shared";
import { getScoreBg } from "@kodnest/shared";

export interface JobCardItem {
  id: string;
  savedJobId: string;
  title: string;
  company: string;
  url: string | null;
  description: string | null;
  location: string | null;
  mode: string | null;
  experienceLevel: string | null;
  skills: string[];
  salaryMin: number | null;
  salaryMax: number | null;
  salaryCurrency: string | null;
  status: string;
  appliedAt: string | null;
  savedAt: string;
  matchScore?: number;
}

const STATUS_OPTIONS: { value: JobStatus; label: string }[] = [
  { value: "saved", label: "Saved" },
  { value: "applied", label: "Applied" },
  { value: "interviewing", label: "Interview" },
  { value: "offered", label: "Offer" },
  { value: "rejected", label: "Rejected" },
];

const STATUS_COLORS: Record<string, string> = {
  saved: "bg-gray-100 text-gray-700",
  applied: "bg-blue-100 text-blue-700",
  interviewing: "bg-purple-100 text-purple-700",
  offered: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-600",
};

interface JobCardProps {
  item: JobCardItem;
  onStatusChange: (savedJobId: string, status: string) => void;
  onRemove: (savedJobId: string) => void;
}

export function JobCard({ item, onStatusChange, onRemove }: JobCardProps) {
  const [expanded, setExpanded] = useState(false);

  function formatSalary(): string | null {
    if (!item.salaryMin && !item.salaryMax) return null;
    const currency = item.salaryCurrency ?? "USD";
    const fmt = (n: number) =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
      }).format(n);
    if (item.salaryMin && item.salaryMax) return `${fmt(item.salaryMin)} – ${fmt(item.salaryMax)}`;
    if (item.salaryMin) return `From ${fmt(item.salaryMin)}`;
    return `Up to ${fmt(item.salaryMax!)}`;
  }

  const salary = formatSalary();

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-sm transition-shadow">
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h2 className="font-semibold text-gray-900 truncate">{item.title}</h2>
              <p className="text-sm text-gray-600">{item.company}</p>
            </div>
            {item.matchScore !== undefined && (
              <span className={cn("flex-shrink-0 px-2 py-0.5 rounded-full text-xs font-semibold", getScoreBg(item.matchScore))}>
                {item.matchScore}% match
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2 mt-2">
            {item.location && (
              <span className="text-xs text-gray-500 flex items-center gap-1">
                📍 {item.location}
              </span>
            )}
            {item.mode && (
              <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full text-xs capitalize">
                {item.mode}
              </span>
            )}
            {item.experienceLevel && (
              <span className="px-2 py-0.5 bg-purple-50 text-purple-600 rounded-full text-xs capitalize">
                {item.experienceLevel}
              </span>
            )}
            {salary && (
              <span className="text-xs text-gray-600 font-medium">{salary}</span>
            )}
          </div>

          {item.skills.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {item.skills.slice(0, 5).map((skill, i) => (
                <span key={i} className="px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                  {skill}
                </span>
              ))}
              {item.skills.length > 5 && (
                <span className="px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded text-xs">
                  +{item.skills.length - 5}
                </span>
              )}
            </div>
          )}

          {item.description && (
            <div className="mt-2">
              <p className={cn("text-sm text-gray-500", !expanded && "line-clamp-2")}>
                {item.description}
              </p>
              {item.description.length > 100 && (
                <button
                  type="button"
                  onClick={() => setExpanded((v) => !v)}
                  className="text-xs text-primary-600 hover:underline mt-0.5"
                >
                  {expanded ? "Less" : "More"}
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
        <div className="flex items-center gap-2">
          {item.url && (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary-600 hover:underline"
            >
              View Job ↗
            </a>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", STATUS_COLORS[item.status] ?? STATUS_COLORS.saved)}>
            {STATUS_OPTIONS.find((s) => s.value === item.status)?.label ?? item.status}
          </span>
          <select
            value={item.status}
            onChange={(e) => onStatusChange(item.savedJobId, e.target.value)}
            className="text-xs border border-gray-300 rounded-lg px-2 py-1 bg-white"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => onRemove(item.savedJobId)}
            className="text-xs text-red-500 hover:text-red-700"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
