import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@kodnest/db";

export async function POST(
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
  const n = await prisma.notification.findFirst({
    where: { id, userId },
  });
  if (!n) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.notification.update({
    where: { id },
    data: { read: true },
  });
  return NextResponse.json({ ok: true });
}
