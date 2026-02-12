"use client";

import { useState } from "react";

type Content = {
  fullName: string;
  email: string;
  phone: string;
  summary: string;
  sections: { type: string; title: string; content: string }[];
  skills: string[];
};

export function ResumeEditor({
  resumeId,
  title: initialTitle,
  content: initialContent,
}: {
  resumeId: string;
  title: string;
  content: Content;
}) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function save() {
    setSaving(true);
    setMessage("");
    const res = await fetch(`/api/v1/resumes/${resumeId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    setSaving(false);
    if (res.ok) setMessage("Saved.");
    else setMessage("Save failed.");
  }

  return (
    <div className="flex gap-6 flex-col lg:flex-row">
      <div className="flex-1 bg-white border border-gray-200 rounded-xl p-6 space-y-4">
        <div className="flex justify-between items-center">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-xl font-bold text-gray-900 bg-transparent border-b border-transparent hover:border-gray-300 focus:border-primary-500 outline-none"
          />
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">{message}</span>
            <button
              type="button"
              onClick={save}
              disabled={saving}
              className="px-3 py-1.5 bg-primary-600 text-white text-sm rounded-lg hover:bg-primary-700 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Full name"
            value={content.fullName}
            onChange={(e) => setContent((c) => ({ ...c, fullName: e.target.value }))}
            className="px-3 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="email"
            placeholder="Email"
            value={content.email}
            onChange={(e) => setContent((c) => ({ ...c, email: e.target.value }))}
            className="px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <input
          type="text"
          placeholder="Phone"
          value={content.phone}
          onChange={(e) => setContent((c) => ({ ...c, phone: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        />
        <textarea
          placeholder="Professional summary"
          value={content.summary}
          onChange={(e) => setContent((c) => ({ ...c, summary: e.target.value }))}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
          <input
            type="text"
            value={content.skills.join(", ")}
            onChange={(e) =>
              setContent((c) => ({
                ...c,
                skills: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
              }))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>
      </div>
      <div className="lg:w-96 bg-gray-100 rounded-xl p-6">
        <h3 className="font-semibold text-gray-900 mb-2">Preview</h3>
        <div className="bg-white p-4 rounded-lg text-sm">
          <p className="font-semibold">{content.fullName || "Your name"}</p>
          <p className="text-gray-600">{content.email || "email"}</p>
          {content.phone && <p className="text-gray-600">{content.phone}</p>}
          {content.summary && (
            <p className="mt-2 text-gray-700">{content.summary}</p>
          )}
          {content.skills.length > 0 && (
            <p className="mt-2 text-gray-600">
              Skills: {content.skills.join(", ")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
