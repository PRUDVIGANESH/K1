"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { useResume } from "@/hooks/use-resume";
import type { ResumeProfile, ResumeTemplate } from "@/types/resume";
import { ResumePreview } from "./resume-preview";
import { ThemePicker } from "./theme-picker";
import { AtsScore } from "./ats-score";

type Tab = "personal" | "experience" | "education" | "skills" | "projects" | "certifications";

const TABS: { value: Tab; label: string }[] = [
  { value: "personal", label: "Personal" },
  { value: "experience", label: "Experience" },
  { value: "education", label: "Education" },
  { value: "skills", label: "Skills" },
  { value: "projects", label: "Projects" },
  { value: "certifications", label: "Certs" },
];

interface ResumeFormProps {
  resumeId: string;
  initialTitle: string;
  initialContent: ResumeProfile;
  initialTemplate: ResumeTemplate;
  initialThemeColor: string;
  initialAtsScore?: number | null;
}

export function ResumeForm({
  resumeId,
  initialTitle,
  initialContent,
  initialTemplate,
  initialThemeColor,
  initialAtsScore,
}: ResumeFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [template, setTemplate] = useState<ResumeTemplate>(initialTemplate);
  const [themeColor, setThemeColor] = useState(initialThemeColor);
  const [activeTab, setActiveTab] = useState<Tab>("personal");
  const [showPreview, setShowPreview] = useState(false);

  const {
    resume,
    saving,
    message,
    updatePersonal,
    addExperience,
    updateExperience,
    removeExperience,
    addEducation,
    updateEducation,
    removeEducation,
    addProject,
    updateProject,
    removeProject,
    addCertification,
    updateCertification,
    removeCertification,
    updateSkills,
    save,
  } = useResume({ resumeId, initialData: initialContent });

  const inputCls = "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none";
  const labelCls = "block text-xs font-medium text-gray-600 mb-1";

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-white border border-gray-200 rounded-xl p-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Resume title"
          className="flex-1 text-lg font-semibold bg-transparent border-b border-transparent hover:border-gray-300 focus:border-primary-500 outline-none"
        />
        <div className="flex items-center gap-2">
          {message && <span className="text-sm text-gray-500">{message}</span>}
          <button
            type="button"
            onClick={() => setShowPreview((v) => !v)}
            className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            {showPreview ? "Edit" : "Preview"}
          </button>
          <button
            type="button"
            onClick={() => save(title, template, themeColor)}
            disabled={saving}
            className="px-4 py-1.5 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      <div className={cn("grid gap-4", showPreview ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1")}>
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <ThemePicker
              template={template}
              themeColor={themeColor}
              onTemplateChange={setTemplate}
              onColorChange={setThemeColor}
            />
          </div>

          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="flex overflow-x-auto border-b border-gray-200">
              {TABS.map((tab) => (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => setActiveTab(tab.value)}
                  className={cn(
                    "px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors",
                    activeTab === tab.value
                      ? "border-b-2 border-primary-600 text-primary-600"
                      : "text-gray-600 hover:text-gray-900"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-4 space-y-4">
              {activeTab === "personal" && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className={labelCls}>Full Name</label>
                      <input className={inputCls} value={resume.personal.fullName} onChange={(e) => updatePersonal("fullName", e.target.value)} placeholder="Jane Smith" />
                    </div>
                    <div>
                      <label className={labelCls}>Email</label>
                      <input className={inputCls} type="email" value={resume.personal.email} onChange={(e) => updatePersonal("email", e.target.value)} placeholder="jane@example.com" />
                    </div>
                    <div>
                      <label className={labelCls}>Phone</label>
                      <input className={inputCls} value={resume.personal.phone} onChange={(e) => updatePersonal("phone", e.target.value)} placeholder="+1 555 000 0000" />
                    </div>
                    <div>
                      <label className={labelCls}>Location</label>
                      <input className={inputCls} value={resume.personal.location} onChange={(e) => updatePersonal("location", e.target.value)} placeholder="San Francisco, CA" />
                    </div>
                    <div>
                      <label className={labelCls}>Website</label>
                      <input className={inputCls} value={resume.personal.website} onChange={(e) => updatePersonal("website", e.target.value)} placeholder="https://yoursite.com" />
                    </div>
                    <div>
                      <label className={labelCls}>LinkedIn</label>
                      <input className={inputCls} value={resume.personal.linkedin} onChange={(e) => updatePersonal("linkedin", e.target.value)} placeholder="linkedin.com/in/yourprofile" />
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>Professional Summary</label>
                    <textarea
                      className={inputCls}
                      rows={4}
                      value={resume.personal.summary}
                      onChange={(e) => updatePersonal("summary", e.target.value)}
                      placeholder="Brief professional summary..."
                    />
                  </div>
                </>
              )}

              {activeTab === "experience" && (
                <div className="space-y-4">
                  {resume.experience.map((exp) => (
                    <div key={exp.id} className="border border-gray-200 rounded-lg p-3 space-y-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <label className={labelCls}>Role</label>
                          <input className={inputCls} value={exp.role} onChange={(e) => updateExperience(exp.id, "role", e.target.value)} placeholder="Software Engineer" />
                        </div>
                        <div>
                          <label className={labelCls}>Company</label>
                          <input className={inputCls} value={exp.company} onChange={(e) => updateExperience(exp.id, "company", e.target.value)} placeholder="Acme Corp" />
                        </div>
                        <div>
                          <label className={labelCls}>Start Date</label>
                          <input className={inputCls} value={exp.startDate} onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)} placeholder="Jan 2022" />
                        </div>
                        <div>
                          <label className={labelCls}>End Date</label>
                          <input className={inputCls} value={exp.endDate} disabled={exp.current} onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)} placeholder="Dec 2024" />
                          <label className="flex items-center gap-1.5 mt-1 text-xs text-gray-600 cursor-pointer">
                            <input type="checkbox" checked={exp.current} onChange={(e) => updateExperience(exp.id, "current", e.target.checked)} />
                            Current role
                          </label>
                        </div>
                      </div>
                      <div>
                        <label className={labelCls}>Description</label>
                        <textarea className={inputCls} rows={3} value={exp.description} onChange={(e) => updateExperience(exp.id, "description", e.target.value)} placeholder="Key achievements and responsibilities..." />
                      </div>
                      <button type="button" onClick={() => removeExperience(exp.id)} className="text-xs text-red-600 hover:underline">
                        Remove
                      </button>
                    </div>
                  ))}
                  <button type="button" onClick={addExperience} className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-primary-400 hover:text-primary-600">
                    + Add Experience
                  </button>
                </div>
              )}

              {activeTab === "education" && (
                <div className="space-y-4">
                  {resume.education.map((edu) => (
                    <div key={edu.id} className="border border-gray-200 rounded-lg p-3 space-y-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <label className={labelCls}>Institution</label>
                          <input className={inputCls} value={edu.institution} onChange={(e) => updateEducation(edu.id, "institution", e.target.value)} placeholder="MIT" />
                        </div>
                        <div>
                          <label className={labelCls}>Degree</label>
                          <input className={inputCls} value={edu.degree} onChange={(e) => updateEducation(edu.id, "degree", e.target.value)} placeholder="B.S." />
                        </div>
                        <div>
                          <label className={labelCls}>Field of Study</label>
                          <input className={inputCls} value={edu.field} onChange={(e) => updateEducation(edu.id, "field", e.target.value)} placeholder="Computer Science" />
                        </div>
                        <div>
                          <label className={labelCls}>GPA</label>
                          <input className={inputCls} value={edu.gpa} onChange={(e) => updateEducation(edu.id, "gpa", e.target.value)} placeholder="3.8" />
                        </div>
                        <div>
                          <label className={labelCls}>Start Year</label>
                          <input className={inputCls} value={edu.startDate} onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)} placeholder="2018" />
                        </div>
                        <div>
                          <label className={labelCls}>End Year</label>
                          <input className={inputCls} value={edu.endDate} onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)} placeholder="2022" />
                        </div>
                      </div>
                      <button type="button" onClick={() => removeEducation(edu.id)} className="text-xs text-red-600 hover:underline">
                        Remove
                      </button>
                    </div>
                  ))}
                  <button type="button" onClick={addEducation} className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-primary-400 hover:text-primary-600">
                    + Add Education
                  </button>
                </div>
              )}

              {activeTab === "skills" && (
                <div>
                  <label className={labelCls}>Skills (comma separated)</label>
                  <textarea
                    className={inputCls}
                    rows={4}
                    value={resume.skills.join(", ")}
                    onChange={(e) =>
                      updateSkills(
                        e.target.value
                          .split(",")
                          .map((s) => s.trim())
                          .filter(Boolean)
                      )
                    }
                    placeholder="TypeScript, React, Node.js, PostgreSQL..."
                  />
                  {resume.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {resume.skills.map((skill, i) => (
                        <span key={i} className="px-2 py-0.5 bg-primary-50 text-primary-700 rounded-full text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "projects" && (
                <div className="space-y-4">
                  {resume.projects.map((proj) => (
                    <div key={proj.id} className="border border-gray-200 rounded-lg p-3 space-y-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <label className={labelCls}>Project Name</label>
                          <input className={inputCls} value={proj.name} onChange={(e) => updateProject(proj.id, "name", e.target.value)} placeholder="My App" />
                        </div>
                        <div>
                          <label className={labelCls}>URL</label>
                          <input className={inputCls} value={proj.url} onChange={(e) => updateProject(proj.id, "url", e.target.value)} placeholder="https://github.com/..." />
                        </div>
                      </div>
                      <div>
                        <label className={labelCls}>Technologies (comma separated)</label>
                        <input
                          className={inputCls}
                          value={proj.technologies.join(", ")}
                          onChange={(e) =>
                            updateProject(
                              proj.id,
                              "technologies",
                              e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                            )
                          }
                          placeholder="React, Node.js..."
                        />
                      </div>
                      <div>
                        <label className={labelCls}>Description</label>
                        <textarea className={inputCls} rows={2} value={proj.description} onChange={(e) => updateProject(proj.id, "description", e.target.value)} placeholder="What this project does..." />
                      </div>
                      <button type="button" onClick={() => removeProject(proj.id)} className="text-xs text-red-600 hover:underline">
                        Remove
                      </button>
                    </div>
                  ))}
                  <button type="button" onClick={addProject} className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-primary-400 hover:text-primary-600">
                    + Add Project
                  </button>
                </div>
              )}

              {activeTab === "certifications" && (
                <div className="space-y-4">
                  {resume.certifications.map((cert) => (
                    <div key={cert.id} className="border border-gray-200 rounded-lg p-3 space-y-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <label className={labelCls}>Certification Name</label>
                          <input className={inputCls} value={cert.name} onChange={(e) => updateCertification(cert.id, "name", e.target.value)} placeholder="AWS Certified Developer" />
                        </div>
                        <div>
                          <label className={labelCls}>Issuing Organization</label>
                          <input className={inputCls} value={cert.issuer} onChange={(e) => updateCertification(cert.id, "issuer", e.target.value)} placeholder="Amazon" />
                        </div>
                        <div>
                          <label className={labelCls}>Date</label>
                          <input className={inputCls} value={cert.date} onChange={(e) => updateCertification(cert.id, "date", e.target.value)} placeholder="Jun 2023" />
                        </div>
                        <div>
                          <label className={labelCls}>URL</label>
                          <input className={inputCls} value={cert.url} onChange={(e) => updateCertification(cert.id, "url", e.target.value)} placeholder="https://..." />
                        </div>
                      </div>
                      <button type="button" onClick={() => removeCertification(cert.id)} className="text-xs text-red-600 hover:underline">
                        Remove
                      </button>
                    </div>
                  ))}
                  <button type="button" onClick={addCertification} className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-primary-400 hover:text-primary-600">
                    + Add Certification
                  </button>
                </div>
              )}
            </div>
          </div>

          <AtsScore resumeId={resumeId} resume={resume} initialScore={initialAtsScore} />
        </div>

        {showPreview && (
          <div className="sticky top-4">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Live Preview</p>
            <ResumePreview resume={resume} template={template} themeColor={themeColor} />
          </div>
        )}
      </div>
    </div>
  );
}
