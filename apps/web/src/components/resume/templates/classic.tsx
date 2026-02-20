import type { ResumeProfile } from "@/types/resume";

interface ClassicTemplateProps {
  resume: ResumeProfile;
  themeColor: string;
}

export function ClassicTemplate({ resume, themeColor }: ClassicTemplateProps) {
  const { personal, experience, education, skills, projects, certifications } = resume;

  return (
    <div className="bg-white text-gray-900 text-xs leading-relaxed font-sans" style={{ minHeight: "100%" }}>
      <div className="px-6 py-5 border-b-2" style={{ borderColor: themeColor }}>
        <h1 className="text-xl font-bold" style={{ color: themeColor }}>
          {personal.fullName || "Your Name"}
        </h1>
        <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1 text-gray-600">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.website && <span>{personal.website}</span>}
          {personal.linkedin && <span>{personal.linkedin}</span>}
        </div>
      </div>

      <div className="px-6 py-4 space-y-4">
        {personal.summary && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wide mb-1" style={{ color: themeColor }}>
              Summary
            </h2>
            <p className="text-gray-700">{personal.summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wide mb-2" style={{ color: themeColor }}>
              Experience
            </h2>
            <div className="space-y-3">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <span className="font-semibold">{exp.role || "Role"}</span>
                    <span className="text-gray-500 text-xs">
                      {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <p className="text-gray-600">{exp.company}</p>
                  {exp.description && <p className="mt-0.5 text-gray-700 whitespace-pre-line">{exp.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wide mb-2" style={{ color: themeColor }}>
              Education
            </h2>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline">
                    <span className="font-semibold">{edu.institution || "Institution"}</span>
                    <span className="text-gray-500 text-xs">
                      {edu.startDate} – {edu.endDate}
                    </span>
                  </div>
                  <p className="text-gray-600">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                    {edu.gpa && ` — GPA: ${edu.gpa}`}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {skills.length > 0 && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wide mb-1" style={{ color: themeColor }}>
              Skills
            </h2>
            <p className="text-gray-700">{skills.join(" · ")}</p>
          </section>
        )}

        {projects.length > 0 && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wide mb-2" style={{ color: themeColor }}>
              Projects
            </h2>
            <div className="space-y-2">
              {projects.map((p) => (
                <div key={p.id}>
                  <span className="font-semibold">{p.name || "Project"}</span>
                  {p.technologies.length > 0 && (
                    <span className="text-gray-500 ml-2">{p.technologies.join(", ")}</span>
                  )}
                  {p.description && <p className="text-gray-700">{p.description}</p>}
                  {p.url && <p className="text-primary-600 truncate">{p.url}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {certifications.length > 0 && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wide mb-2" style={{ color: themeColor }}>
              Certifications
            </h2>
            <div className="space-y-1">
              {certifications.map((c) => (
                <div key={c.id} className="flex justify-between">
                  <span className="font-semibold">{c.name || "Certification"}</span>
                  <span className="text-gray-500 text-xs">{c.issuer} {c.date && `· ${c.date}`}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
