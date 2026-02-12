"use client";

import { useState } from "react";

type Item = {
  id: string;
  savedJobId: string;
  title: string;
  company: string;
  url: string | null;
  description: string | null;
  status: string;
  appliedAt: string | null;
  savedAt: string;
};

export function JobList({ items: initial }: { items: Item[] }) {
  const [items, setItems] = useState(initial);

  async function updateStatus(savedJobId: string, status: string) {
    const res = await fetch(`/api/v1/jobs/saved/${savedJobId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) return;
    setItems((prev) =>
      prev.map((i) =>
        i.savedJobId === savedJobId
          ? { ...i, status, appliedAt: status !== "saved" ? new Date().toISOString() : i.appliedAt }
          : i
      )
    );
  }

  async function remove(savedJobId: string) {
    const res = await fetch(`/api/v1/jobs/saved/${savedJobId}`, { method: "DELETE" });
    if (!res.ok) return;
    setItems((prev) => prev.filter((i) => i.savedJobId !== savedJobId));
  }

  if (items.length === 0) {
    return (
      <p className="text-gray-500 py-8">No saved jobs yet. Add one above.</p>
    );
  }

  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li
          key={item.savedJobId}
          className="bg-white border border-gray-200 rounded-xl p-4"
        >
          <div className="flex justify-between items-start gap-4">
            <div className="min-w-0 flex-1">
              <h2 className="font-semibold text-gray-900">{item.title}</h2>
              <p className="text-sm text-gray-600">{item.company}</p>
              {item.url && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary-600 hover:underline mt-1 inline-block"
                >
                  View job
                </a>
              )}
              {item.description && (
                <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                  {item.description}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <select
                value={item.status}
                onChange={(e) => updateStatus(item.savedJobId, e.target.value)}
                className="text-sm border border-gray-300 rounded-lg px-2 py-1"
              >
                <option value="saved">Saved</option>
                <option value="applied">Applied</option>
                <option value="interviewing">Interviewing</option>
                <option value="offered">Offered</option>
                <option value="rejected">Rejected</option>
              </select>
              <button
                onClick={() => remove(item.savedJobId)}
                className="text-sm text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
