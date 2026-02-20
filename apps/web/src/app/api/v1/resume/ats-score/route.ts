import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@kodnest/db";
import type { ResumeProfile } from "@/types/resume";

function calculateAtsScore(resume: ResumeProfile): { score: number; strengths: string[]; suggestions: string[] } {
  const strengths: string[] = [];
  const suggestions: string[] = [];
  let score = 0;

  if (resume.personal.fullName) { score += 5; strengths.push("Full name is present"); }
  else suggestions.push("Add your full name");

  if (resume.personal.email) { score += 5; strengths.push("Email address is present"); }
  else suggestions.push("Add your email address");

  if (resume.personal.phone) { score += 5; strengths.push("Phone number is present"); }
  else suggestions.push("Add your phone number");

  if (resume.personal.location) { score += 3; strengths.push("Location is specified"); }
  else suggestions.push("Add your location or city");

  if (resume.personal.linkedin) { score += 5; strengths.push("LinkedIn profile linked"); }
  else suggestions.push("Add your LinkedIn URL");

  if (resume.personal.summary && resume.personal.summary.length >= 50) {
    score += 10;
    strengths.push("Professional summary is detailed");
  } else if (resume.personal.summary) {
    score += 5;
    suggestions.push("Expand your professional summary (aim for 2–4 sentences)");
  } else {
    suggestions.push("Add a professional summary");
  }

  if (resume.experience.length > 0) {
    score += 15;
    strengths.push(`${resume.experience.length} work experience entry(ies) included`);
    const withDesc = resume.experience.filter((e) => e.description && e.description.length > 30);
    if (withDesc.length === resume.experience.length) {
      score += 10;
      strengths.push("All experience entries have descriptions");
    } else {
      suggestions.push("Add detailed descriptions to all work experience entries");
    }
  } else {
    suggestions.push("Add at least one work experience entry");
  }

  if (resume.education.length > 0) {
    score += 10;
    strengths.push("Education section is present");
  } else {
    suggestions.push("Add your education background");
  }

  if (resume.skills.length >= 5) {
    score += 15;
    strengths.push(`${resume.skills.length} skills listed`);
  } else if (resume.skills.length > 0) {
    score += 7;
    suggestions.push("Add more skills (aim for at least 5–10)");
  } else {
    suggestions.push("Add relevant skills");
  }

  if (resume.projects.length > 0) {
    score += 7;
    strengths.push("Projects section adds value");
  }

  if (resume.certifications.length > 0) {
    score += 5;
    strengths.push("Certifications boost credibility");
  }

  const clampedScore = Math.min(100, score);
  return { score: clampedScore, strengths, suggestions };
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = (session.user as { id?: string }).id;
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const { resumeId, resume } = body;
  if (!resumeId || !resume) {
    return NextResponse.json({ error: "resumeId and resume required" }, { status: 400 });
  }

  const dbResume = await prisma.resume.findFirst({ where: { id: String(resumeId), userId } });
  if (!dbResume) return NextResponse.json({ error: "Resume not found" }, { status: 404 });

  const { score, strengths, suggestions } = calculateAtsScore(resume as ResumeProfile);
  const feedback = { score, strengths, suggestions };

  await prisma.resume.update({
    where: { id: dbResume.id },
    data: { atsScore: score, atsFeedback: feedback },
  });

  return NextResponse.json({ score, feedback });
}
