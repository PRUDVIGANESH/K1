import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@kodnest/db";

const VALID_STATUS = ["saved", "applied", "interviewing", "offered", "rejected"];

export async function PATCH(
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
  const body = await _req.json().catch(() => ({}));
  const { status } = body;
  if (!status || !VALID_STATUS.includes(status)) {
    return NextResponse.json(
      { error: "status must be one of: " + VALID_STATUS.join(", ") },
      { status: 400 }
    );
  }

  const saved = await prisma.savedJob.findFirst({
    where: { id, userId },
  });
  if (!saved) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const updated = await prisma.savedJob.update({
    where: { id },
    data: {
      status,
      appliedAt: status !== "saved" ? (saved.appliedAt ?? new Date()) : saved.appliedAt,
    },
  });
  return NextResponse.json({
    id: updated.id,
    status: updated.status,
    appliedAt: updated.appliedAt?.toISOString() ?? null,
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
  const saved = await prisma.savedJob.findFirst({
    where: { id, userId },
  });
  if (!saved) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  await prisma.savedJob.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
