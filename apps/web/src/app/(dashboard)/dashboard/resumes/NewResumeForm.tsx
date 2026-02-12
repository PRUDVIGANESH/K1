"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Content = {
  fullName: string;
  email: string;
  phone: string;
  summary: string;
  sections: { type: string; title: string; content: string }[];
  skills: string[];
};

export function NewResumeForm({
  defaultTitle,
  defaultContent,
}: {
  defaultTitle: string;
  defaultContent: Content;
}) {
  const router = useRouter();
  const [title, setTitle] = useState(defaultTitle);
  const [content, setContent] = useState(defaultContent);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await fetch("/api/v1/resumes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    setLoading(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Failed to create");
      return;
    }
    const data = await res.json();
    router.push(`/dashboard/resumes/${data.id}`);
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-6 space-y-4 max-w-2xl">
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
          <input
            type="text"
            value={content.fullName}
            onChange={(e) => setContent((c) => ({ ...c, fullName: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={content.email}
            onChange={(e) => setContent((c) => ({ ...c, email: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
        <input
          type="text"
          value={content.phone}
          onChange={(e) => setContent((c) => ({ ...c, phone: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Summary</label>
        <textarea
          value={content.summary}
          onChange={(e) => setContent((c) => ({ ...c, summary: e.target.value }))}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Skills (comma-separated)</label>
        <input
          type="text"
          value={content.skills.join(", ")}
          onChange={(e) =>
            setContent((c) => ({
              ...c,
              skills: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
            }))
          }
          placeholder="JavaScript, React, Node.js"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
      >
        {loading ? "Creating..." : "Create resume"}
      </button>
    </form>
  );
}
