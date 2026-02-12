import { getSession } from "@/lib/auth";
import { prisma } from "@kodnest/db";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { ResumeEditor } from "./ResumeEditor";

export default async function ResumeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getSession();
  if (!session?.user) redirect("/login");
  const userId = (session.user as { id?: string }).id;
  if (!userId) redirect("/login");

  const { id } = await params;
  const resume = await prisma.resume.findFirst({
    where: { id, userId },
  });
  if (!resume) notFound();

  const content = resume.content as {
    fullName?: string;
    email?: string;
    phone?: string;
    summary?: string;
    sections?: { type: string; title: string; content: string }[];
    skills?: string[];
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/dashboard/resumes"
          className="text-primary-600 hover:underline text-sm"
        >
          &larr; Resumes
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">{resume.title}</h1>
      </div>
      <ResumeEditor
        resumeId={resume.id}
        title={resume.title}
        content={{
          fullName: content?.fullName ?? "",
          email: content?.email ?? "",
          phone: content?.phone ?? "",
          summary: content?.summary ?? "",
          sections: content?.sections ?? [],
          skills: content?.skills ?? [],
        }}
      />
    </div>
  );
}
