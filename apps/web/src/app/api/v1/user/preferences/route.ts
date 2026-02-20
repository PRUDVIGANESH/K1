import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@kodnest/db";

export async function GET() {
  const session = await getSession();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = (session.user as { id?: string }).id;
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const prefs = await prisma.userPreference.findUnique({ where: { userId } });
  return NextResponse.json({ preferences: prefs ?? null });
}

export async function PUT(req: Request) {
  const session = await getSession();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = (session.user as { id?: string }).id;
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const {
    roleKeywords,
    preferredLocations,
    preferredMode,
    experienceLevel,
    skills,
    minMatchScore,
  } = body;

  const data = {
    roleKeywords: Array.isArray(roleKeywords) ? roleKeywords.map(String) : [],
    preferredLocations: Array.isArray(preferredLocations) ? preferredLocations.map(String) : [],
    preferredMode: preferredMode ? String(preferredMode) : null,
    experienceLevel: experienceLevel ? String(experienceLevel) : null,
    skills: Array.isArray(skills) ? skills.map(String) : [],
    minMatchScore: typeof minMatchScore === "number" ? minMatchScore : 0,
  };

  const prefs = await prisma.userPreference.upsert({
    where: { userId },
    create: { userId, ...data },
    update: data,
  });

  return NextResponse.json({ preferences: prefs });
}
