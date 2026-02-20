"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function NewResumeForm({
  defaultTitle,
  defaultName,
  defaultEmail,
}: {
  defaultTitle: string;
  defaultName: string;
  defaultEmail: string;
}) {
  const router = useRouter();
  const [title, setTitle] = useState(defaultTitle);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await fetch("/api/v1/resumes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        content: {
          personal: {
            fullName: defaultName,
            email: defaultEmail,
            phone: "",
            location: "",
            website: "",
            linkedin: "",
            summary: "",
          },
          experience: [],
          education: [],
          skills: [],
          projects: [],
          certifications: [],
        },
      }),
    });
    setLoading(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Failed to create");
      return;
    }
    const data = await res.json();
    router.push(`/dashboard/resumes/builder?id=${data.id}`);
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-6 space-y-4 max-w-lg">
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Resume Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="e.g. Software Engineer Resume"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
        />
      </div>
      <p className="text-sm text-gray-500">
        After creating, you&apos;ll be taken to the full resume builder with templates and ATS scoring.
      </p>
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
      >
        {loading ? "Creating..." : "Create & Open Builder"}
      </button>
    </form>
  );
}
