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

  const resumes = await prisma.resume.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
  });
  return NextResponse.json({
    items: resumes.map((r) => ({
      id: r.id,
      title: r.title,
      content: r.content,
      createdAt: r.createdAt.toISOString(),
      updatedAt: r.updatedAt.toISOString(),
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
  const { title, content } = body;
  if (!title || typeof title !== "string" || title.trim().length === 0) {
    return NextResponse.json({ error: "title required" }, { status: 400 });
  }
  const safeContent = content && typeof content === "object" ? content : defaultResumeContent(session.user);

  const resume = await prisma.resume.create({
    data: {
      userId,
      title: title.trim(),
      content: safeContent as object,
    },
  });
  return NextResponse.json({
    id: resume.id,
    title: resume.title,
    content: resume.content,
    createdAt: resume.createdAt.toISOString(),
    updatedAt: resume.updatedAt.toISOString(),
  });
}

function defaultResumeContent(user: { name?: string | null; email?: string | null }) {
  return {
    fullName: user.name ?? "",
    email: user.email ?? "",
    phone: "",
    summary: "",
    sections: [],
    skills: [],
  };
}
