import type { ResumeProfile } from "@/types/resume";

interface ModernTemplateProps {
  resume: ResumeProfile;
  themeColor: string;
}

export function ModernTemplate({ resume, themeColor }: ModernTemplateProps) {
  const { personal, experience, education, skills, projects, certifications } = resume;

  return (
    <div className="bg-white text-gray-900 text-xs leading-relaxed font-sans flex" style={{ minHeight: "100%" }}>
      <div className="w-36 flex-shrink-0 text-white px-4 py-5 space-y-4" style={{ backgroundColor: themeColor }}>
        <div>
          <h1 className="font-bold text-sm leading-tight">{personal.fullName || "Your Name"}</h1>
        </div>
        <div className="space-y-0.5 text-xs opacity-90">
          {personal.email && <p className="break-all">{personal.email}</p>}
          {personal.phone && <p>{personal.phone}</p>}
          {personal.location && <p>{personal.location}</p>}
          {personal.linkedin && <p className="break-all">{personal.linkedin}</p>}
          {personal.website && <p className="break-all">{personal.website}</p>}
        </div>

        {skills.length > 0 && (
          <div>
            <h2 className="font-bold text-xs uppercase tracking-wide opacity-70 mb-1">Skills</h2>
            <ul className="space-y-0.5">
              {skills.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        )}

        {certifications.length > 0 && (
          <div>
            <h2 className="font-bold text-xs uppercase tracking-wide opacity-70 mb-1">Certs</h2>
            {certifications.map((c) => (
              <p key={c.id} className="font-medium">{c.name}</p>
            ))}
          </div>
        )}
      </div>

      <div className="flex-1 px-5 py-5 space-y-4 min-w-0">
        {personal.summary && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: themeColor }}>
              About
            </h2>
            <p className="text-gray-700">{personal.summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: themeColor }}>
              Experience
            </h2>
            <div className="space-y-3">
              {experience.map((exp) => (
                <div key={exp.id} className="border-l-2 pl-3" style={{ borderColor: themeColor }}>
                  <div className="flex justify-between items-baseline flex-wrap gap-1">
                    <span className="font-semibold">{exp.role || "Role"}</span>
                    <span className="text-gray-500 text-xs">
                      {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <p className="text-gray-500">{exp.company}</p>
                  {exp.description && <p className="mt-0.5 text-gray-700 whitespace-pre-line">{exp.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: themeColor }}>
              Education
            </h2>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id} className="border-l-2 pl-3" style={{ borderColor: themeColor }}>
                  <span className="font-semibold">{edu.institution || "Institution"}</span>
                  <p className="text-gray-500">
                    {edu.degree} {edu.field && `· ${edu.field}`}
                    {edu.gpa && ` · GPA ${edu.gpa}`}
                  </p>
                  <p className="text-gray-400 text-xs">{edu.startDate} – {edu.endDate}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: themeColor }}>
              Projects
            </h2>
            <div className="space-y-2">
              {projects.map((p) => (
                <div key={p.id}>
                  <span className="font-semibold">{p.name || "Project"}</span>
                  {p.technologies.length > 0 && (
                    <span className="text-gray-400 ml-1">({p.technologies.join(", ")})</span>
                  )}
                  {p.description && <p className="text-gray-700">{p.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
