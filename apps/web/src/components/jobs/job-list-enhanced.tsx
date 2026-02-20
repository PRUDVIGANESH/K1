"use client";

import { useState, useMemo } from "react";
import { JobCard, type JobCardItem } from "./job-card";
import { JobFilterBar, type JobFilters } from "./job-filter-bar";
import { AddJobForm } from "@/app/(dashboard)/dashboard/jobs/AddJobForm";

const DEFAULT_FILTERS: JobFilters = {
  status: "",
  mode: "",
  experienceLevel: "",
  location: "",
  sort: "latest",
  search: "",
};

interface JobListEnhancedProps {
  items: JobCardItem[];
}

export function JobListEnhanced({ items: initial }: JobListEnhancedProps) {
  const [items, setItems] = useState(initial);
  const [filters, setFilters] = useState<JobFilters>(DEFAULT_FILTERS);

  async function handleStatusChange(savedJobId: string, status: string) {
    const res = await fetch(`/api/v1/jobs/saved/${savedJobId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) return;
    setItems((prev) =>
      prev.map((i) =>
        i.savedJobId === savedJobId
          ? {
              ...i,
              status,
              appliedAt: status !== "saved" ? new Date().toISOString() : i.appliedAt,
            }
          : i
      )
    );
  }

  async function handleRemove(savedJobId: string) {
    const res = await fetch(`/api/v1/jobs/saved/${savedJobId}`, { method: "DELETE" });
    if (!res.ok) return;
    setItems((prev) => prev.filter((i) => i.savedJobId !== savedJobId));
  }

  const filteredAndSorted = useMemo(() => {
    let result = [...items];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.company.toLowerCase().includes(q) ||
          item.skills.some((s) => s.toLowerCase().includes(q))
      );
    }

    if (filters.status) {
      result = result.filter((item) => item.status === filters.status);
    }

    if (filters.mode) {
      result = result.filter(
        (item) => item.mode?.toLowerCase() === filters.mode.toLowerCase()
      );
    }

    if (filters.experienceLevel) {
      result = result.filter(
        (item) => item.experienceLevel?.toLowerCase() === filters.experienceLevel.toLowerCase()
      );
    }

    if (filters.location) {
      const loc = filters.location.toLowerCase();
      result = result.filter((item) => item.location?.toLowerCase().includes(loc));
    }

    result.sort((a, b) => {
      if (filters.sort === "score") {
        return (b.matchScore ?? 0) - (a.matchScore ?? 0);
      }
      if (filters.sort === "salary") {
        const aMax = a.salaryMax ?? a.salaryMin ?? 0;
        const bMax = b.salaryMax ?? b.salaryMin ?? 0;
        return bMax - aMax;
      }
      return new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime();
    });

    return result;
  }, [items, filters]);

  return (
    <div className="space-y-4">
      <AddJobForm />

      <JobFilterBar
        filters={filters}
        onFiltersChange={setFilters}
        totalCount={items.length}
        filteredCount={filteredAndSorted.length}
      />

      {filteredAndSorted.length === 0 ? (
        <p className="text-gray-500 py-8 text-center">
          {items.length === 0 ? "No saved jobs yet. Add one above." : "No jobs match the current filters."}
        </p>
      ) : (
        <div className="space-y-3">
          {filteredAndSorted.map((item) => (
            <JobCard
              key={item.savedJobId}
              item={item}
              onStatusChange={handleStatusChange}
              onRemove={handleRemove}
            />
          ))}
        </div>
      )}
    </div>
  );
}
