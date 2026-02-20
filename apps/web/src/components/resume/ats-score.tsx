"use client";

import { useState } from "react";
import { AtsCircle } from "./ats-circle";
import type { ResumeProfile } from "@/types/resume";

interface AtsFeedback {
  score: number;
  suggestions: string[];
  strengths: string[];
}

interface AtsScoreProps {
  resumeId: string;
  resume: ResumeProfile;
  initialScore?: number | null;
  initialFeedback?: AtsFeedback | null;
}

export function AtsScore({ resumeId, resume, initialScore, initialFeedback }: AtsScoreProps) {
  const [score, setScore] = useState<number | null>(initialScore ?? null);
  const [feedback, setFeedback] = useState<AtsFeedback | null>(initialFeedback ?? null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function analyze() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/v1/resume/ats-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeId, resume }),
      });
      if (!res.ok) {
        setError("Analysis failed. Please try again.");
        return;
      }
      const data = await res.json();
      setScore(data.score);
      setFeedback(data.feedback);
    } catch {
      setError("Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">ATS Score</h3>
        <button
          type="button"
          onClick={analyze}
          disabled={loading}
          className="px-3 py-1.5 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {score !== null ? (
        <div className="flex items-start gap-4">
          <AtsCircle score={score} size={80} />
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-600 mb-1">
              {score >= 75 ? "Excellent! Your resume is ATS-friendly." : score >= 50 ? "Good, but can be improved." : "Needs improvement for ATS systems."}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-sm text-gray-500">Click &quot;Analyze&quot; to check your ATS compatibility score.</p>
      )}

      {feedback && (
        <div className="space-y-3">
          {feedback.strengths.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-1">Strengths</p>
              <ul className="space-y-1">
                {feedback.strengths.map((s, i) => (
                  <li key={i} className="text-sm text-gray-700 flex items-start gap-1.5">
                    <span className="text-green-500 mt-0.5">✓</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {feedback.suggestions.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-yellow-700 uppercase tracking-wide mb-1">Suggestions</p>
              <ul className="space-y-1">
                {feedback.suggestions.map((s, i) => (
                  <li key={i} className="text-sm text-gray-700 flex items-start gap-1.5">
                    <span className="text-yellow-500 mt-0.5">→</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
