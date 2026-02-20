import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@kodnest/db";
import { calculateMatchScore } from "@kodnest/shared";

export async function POST(req: Request) {
  const session = await getSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = (session.user as { id?: string }).id;
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const { jobId } = body;
  if (!jobId) return NextResponse.json({ error: "jobId required" }, { status: 400 });

  const [job, prefs] = await Promise.all([
    prisma.job.findUnique({ where: { id: String(jobId) } }),
    prisma.userPreference.findUnique({ where: { userId } }),
  ]);

  if (!job) return NextResponse.json({ error: "Job not found" }, { status: 404 });
  if (!prefs) return NextResponse.json({ score: null, message: "No preferences set" });

  const result = calculateMatchScore(
    {
      title: job.title,
      description: job.description,
      location: job.location,
      mode: job.mode,
      experienceLevel: job.experienceLevel,
      skills: job.skills,
      salaryMin: job.salaryMin,
      salaryMax: job.salaryMax,
    },
    {
      roleKeywords: prefs.roleKeywords,
      preferredLocations: prefs.preferredLocations,
      preferredMode: prefs.preferredMode,
      experienceLevel: prefs.experienceLevel,
      skills: prefs.skills,
      minMatchScore: prefs.minMatchScore,
    }
  );

  return NextResponse.json(result);
}
