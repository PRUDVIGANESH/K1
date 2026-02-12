import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@kodnest/db";

export async function GET(req: Request) {
  const session = await getSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = (session.user as { id?: string }).id;
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const all = searchParams.get("all") === "1";

  if (all) {
    const jobs = await prisma.job.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
    });
    const saved = await prisma.savedJob.findMany({
      where: { userId },
      select: { jobId: true, status: true, appliedAt: true, savedAt: true, id: true },
    });
    const savedMap = new Map(saved.map((s) => [s.jobId, s]));
    return NextResponse.json({
      items: jobs.map((j) => ({
        ...j,
        postedAt: j.postedAt?.toISOString() ?? null,
        createdAt: j.createdAt.toISOString(),
        saved: savedMap.get(j.id) ?? null,
      })),
    });
  }

  const savedJobs = await prisma.savedJob.findMany({
    where: { userId },
    include: { job: true },
    orderBy: { savedAt: "desc" },
  });
  return NextResponse.json({
    items: savedJobs.map((s) => ({
      id: s.job.id,
      savedJobId: s.id,
      source: s.job.source,
      externalId: s.job.externalId,
      title: s.job.title,
      company: s.job.company,
      url: s.job.url,
      description: s.job.description,
      postedAt: s.job.postedAt?.toISOString() ?? null,
      status: s.status,
      appliedAt: s.appliedAt?.toISOString() ?? null,
      savedAt: s.savedAt.toISOString(),
    })),
  });
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = (session.user as { id?: string }).id;
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const { title, company, url, description } = body;
  if (!title || !company) {
    return NextResponse.json(
      { error: "title and company required" },
      { status: 400 }
    );
  }

  const job = await prisma.job.create({
    data: {
      source: "manual",
      title: String(title).trim(),
      company: String(company).trim(),
      url: url ? String(url).trim() : null,
      description: description ? String(description).trim() : null,
    },
  });

  const saved = await prisma.savedJob.create({
    data: { userId, jobId: job.id, status: "saved" },
  });

  return NextResponse.json({
    job: {
      id: job.id,
      title: job.title,
      company: job.company,
      url: job.url,
      description: job.description,
      postedAt: job.postedAt?.toISOString() ?? null,
      createdAt: job.createdAt.toISOString(),
    },
    savedJobId: saved.id,
    status: saved.status,
    savedAt: saved.savedAt.toISOString(),
  });
}
