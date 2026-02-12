import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@kodnest/db";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = (session.user as { id?: string }).id;
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const resume = await prisma.resume.findFirst({
    where: { id, userId },
  });
  if (!resume) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({
    id: resume.id,
    title: resume.title,
    content: resume.content,
    createdAt: resume.createdAt.toISOString(),
    updatedAt: resume.updatedAt.toISOString(),
  });
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = (session.user as { id?: string }).id;
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const resume = await prisma.resume.findFirst({
    where: { id, userId },
  });
  if (!resume) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await req.json().catch(() => ({}));
  const { title, content } = body;
  const updates: { title?: string; content?: object } = {};
  if (typeof title === "string" && title.trim()) updates.title = title.trim();
  if (content && typeof content === "object") updates.content = content;

  const updated = await prisma.resume.update({
    where: { id },
    data: updates,
  });
  return NextResponse.json({
    id: updated.id,
    title: updated.title,
    content: updated.content,
    createdAt: updated.createdAt.toISOString(),
    updatedAt: updated.updatedAt.toISOString(),
  });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = (session.user as { id?: string }).id;
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const resume = await prisma.resume.findFirst({
    where: { id, userId },
  });
  if (!resume) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.resume.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
