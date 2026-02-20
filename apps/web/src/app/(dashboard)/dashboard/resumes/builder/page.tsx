import { getSession } from "@/lib/auth";
import { prisma } from "@kodnest/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ResumeForm } from "@/components/resume/resume-form";
import type { ResumeProfile, ResumeTemplate } from "@/types/resume";
import { INITIAL_RESUME_STATE } from "@/types/resume";

export default async function ResumeBuilderPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const session = await getSession();
  if (!session?.user) redirect("/login");
  const userId = (session.user as { id?: string }).id;
  if (!userId) redirect("/login");

  const { id } = await searchParams;

  let resume;
  if (id) {
    resume = await prisma.resume.findFirst({ where: { id, userId } });
    if (!resume) redirect("/dashboard/resumes");
  }

  const content = (resume?.content ?? INITIAL_RESUME_STATE) as ResumeProfile;

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/dashboard/resumes" className="text-primary-600 hover:underline text-sm">
          &larr; Resumes
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Resume Builder</h1>
      </div>

      {resume ? (
        <ResumeForm
          resumeId={resume.id}
          initialTitle={resume.title}
          initialContent={content}
          initialTemplate={(resume.template as ResumeTemplate) ?? "classic"}
          initialThemeColor={resume.themeColor ?? "#0284c7"}
          initialAtsScore={resume.atsScore}
        />
      ) : (
        <NewResumeRedirect />
      )}
    </div>
  );
}

function NewResumeRedirect() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 text-center space-y-4">
      <p className="text-gray-600">Create a new resume to use the builder.</p>
      <Link
        href="/dashboard/resumes/new"
        className="inline-block px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
      >
        Create Resume
      </Link>
    </div>
  );
}
