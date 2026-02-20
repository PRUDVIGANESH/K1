"use client";

import { cn } from "@/lib/utils";

export type SortOption = "score" | "salary" | "latest";

export interface JobFilters {
  status: string;
  mode: string;
  experienceLevel: string;
  location: string;
  sort: SortOption;
  search: string;
}

interface JobFilterBarProps {
  filters: JobFilters;
  onFiltersChange: (filters: JobFilters) => void;
  totalCount: number;
  filteredCount: number;
}

const STATUS_OPTIONS = [
  { value: "", label: "All Statuses" },
  { value: "saved", label: "Saved" },
  { value: "applied", label: "Applied" },
  { value: "interviewing", label: "Interview" },
  { value: "offered", label: "Offer" },
  { value: "rejected", label: "Rejected" },
];

const MODE_OPTIONS = [
  { value: "", label: "All Modes" },
  { value: "remote", label: "Remote" },
  { value: "hybrid", label: "Hybrid" },
  { value: "onsite", label: "On-site" },
];

const EXPERIENCE_OPTIONS = [
  { value: "", label: "All Levels" },
  { value: "junior", label: "Junior" },
  { value: "mid", label: "Mid-level" },
  { value: "senior", label: "Senior" },
  { value: "lead", label: "Lead" },
];

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "latest", label: "Latest" },
  { value: "score", label: "Best Match" },
  { value: "salary", label: "Salary" },
];

const selectCls = "text-sm border border-gray-300 rounded-lg px-3 py-1.5 bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none";

export function JobFilterBar({ filters, onFiltersChange, totalCount, filteredCount }: JobFilterBarProps) {
  function update(key: keyof JobFilters, value: string) {
    onFiltersChange({ ...filters, [key]: value });
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-gray-900">Job Tracker</h2>
        <span className="text-sm text-gray-500">
          {filteredCount === totalCount ? `${totalCount} jobs` : `${filteredCount} of ${totalCount}`}
        </span>
      </div>

      <input
        type="search"
        placeholder="Search by title, company or skill..."
        value={filters.search}
        onChange={(e) => update("search", e.target.value)}
        className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
      />

      <div className="flex flex-wrap gap-2">
        <select value={filters.status} onChange={(e) => update("status", e.target.value)} className={selectCls}>
          {STATUS_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>

        <select value={filters.mode} onChange={(e) => update("mode", e.target.value)} className={selectCls}>
          {MODE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>

        <select value={filters.experienceLevel} onChange={(e) => update("experienceLevel", e.target.value)} className={selectCls}>
          {EXPERIENCE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>

        <input
          type="text"
          placeholder="Location..."
          value={filters.location}
          onChange={(e) => update("location", e.target.value)}
          className={cn(selectCls, "w-32")}
        />

        <select value={filters.sort} onChange={(e) => update("sort", e.target.value as SortOption)} className={selectCls}>
          {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>
    </div>
  );
}
