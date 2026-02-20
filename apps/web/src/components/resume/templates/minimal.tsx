import type { ResumeProfile } from "@/types/resume";

interface MinimalTemplateProps {
  resume: ResumeProfile;
  themeColor: string;
}

export function MinimalTemplate({ resume, themeColor }: MinimalTemplateProps) {
  const { personal, experience, education, skills, projects, certifications } = resume;

  return (
    <div className="bg-white text-gray-900 text-xs leading-relaxed font-sans px-8 py-8" style={{ minHeight: "100%" }}>
      <div className="mb-5">
        <h1 className="text-2xl font-light tracking-widest uppercase">{personal.fullName || "Your Name"}</h1>
        <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-1 text-gray-500 text-xs">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.website && <span>{personal.website}</span>}
          {personal.linkedin && <span>{personal.linkedin}</span>}
        </div>
      </div>

      {personal.summary && (
        <section className="mb-4">
          <p className="text-gray-600 italic">{personal.summary}</p>
        </section>
      )}

      <hr className="border-gray-200 mb-4" />

      {experience.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: themeColor }}>
            Experience
          </h2>
          <div className="space-y-3">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <span className="font-medium">{exp.role || "Role"} · {exp.company}</span>
                  <span className="text-gray-400 text-xs">
                    {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                  </span>
                </div>
                {exp.description && <p className="text-gray-600 mt-0.5 whitespace-pre-line">{exp.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: themeColor }}>
            Education
          </h2>
          <div className="space-y-2">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <span className="font-medium">{edu.institution}</span>
                  <span className="text-gray-500 ml-2">{edu.degree} {edu.field && `· ${edu.field}`}</span>
                </div>
                <span className="text-gray-400 text-xs">{edu.startDate} – {edu.endDate}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {skills.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: themeColor }}>
            Skills
          </h2>
          <p className="text-gray-600">{skills.join("  ·  ")}</p>
        </section>
      )}

      {projects.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: themeColor }}>
            Projects
          </h2>
          <div className="space-y-1">
            {projects.map((p) => (
              <div key={p.id}>
                <span className="font-medium">{p.name}</span>
                {p.technologies.length > 0 && (
                  <span className="text-gray-400 ml-1 text-xs">[{p.technologies.join(", ")}]</span>
                )}
                {p.description && <p className="text-gray-600">{p.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {certifications.length > 0 && (
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: themeColor }}>
            Certifications
          </h2>
          <div className="space-y-0.5">
            {certifications.map((c) => (
              <p key={c.id}>
                <span className="font-medium">{c.name}</span>
                {c.issuer && <span className="text-gray-500"> · {c.issuer}</span>}
                {c.date && <span className="text-gray-400"> ({c.date})</span>}
              </p>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
