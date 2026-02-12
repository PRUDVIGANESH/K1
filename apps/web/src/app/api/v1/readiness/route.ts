import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@kodnest/db";

export async function GET() {
  const session = await getSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = (session.user as { id?: string }).id;
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const latest = await prisma.readinessScore.findFirst({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
  if (!latest) {
    return NextResponse.json({ score: null });
  }
  return NextResponse.json({
    score: {
      id: latest.id,
      overall: latest.overall,
      breakdown: latest.breakdown as Record<string, number>,
      createdAt: latest.createdAt.toISOString(),
    },
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
  const { overall, breakdown } = body;
  const score = typeof overall === "number" ? Math.min(100, Math.max(0, overall)) : 50;
  const breakdownObj =
    breakdown && typeof breakdown === "object" ? breakdown : { profile: 50, resume: 50, applications: 0 };

  const created = await prisma.readinessScore.create({
    data: { userId, overall: score, breakdown: breakdownObj },
  });
  return NextResponse.json({
    id: created.id,
    overall: created.overall,
    breakdown: created.breakdown,
    createdAt: created.createdAt.toISOString(),
  });
}
