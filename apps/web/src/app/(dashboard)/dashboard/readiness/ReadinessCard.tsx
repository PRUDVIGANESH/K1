"use client";

import { useState, useEffect } from "react";

export function ReadinessCard({
  score,
  breakdown,
  createdAt,
}: {
  score: number | null;
  breakdown: Record<string, number> | null;
  createdAt: string | null;
}) {
  const [calculating, setCalculating] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  async function runAssessment() {
    setCalculating(true);
    await fetch("/api/v1/readiness", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        overall: Math.floor(Math.random() * 40) + 60,
        breakdown: {
          profile: 70,
          resume: 80,
          applications: 60,
        },
      }),
    });
    setCalculating(false);
    window.location.reload();
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 max-w-md">
      {score !== null ? (
        <>
          <div className="text-4xl font-bold text-primary-600 mb-2">{score}</div>
          <p className="text-sm text-gray-500 mb-4">Overall readiness score</p>
          {mounted && createdAt && (
            <p className="text-xs text-gray-400">
              Last run: {new Date(createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          )}
          {breakdown && Object.keys(breakdown).length > 0 && (
            <ul className="mt-4 space-y-2">
              {Object.entries(breakdown).map(([key, val]) => (
                <li key={key} className="flex justify-between text-sm">
                  <span className="capitalize text-gray-600">{key}</span>
                  <span className="font-medium">{val}%</span>
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <p className="text-gray-500 mb-4">No readiness score yet.</p>
      )}
      <button
        onClick={runAssessment}
        disabled={calculating}
        className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
      >
        {calculating ? "Calculating..." : "Run assessment"}
      </button>
    </div>
  );
}
