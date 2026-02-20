import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { NewResumeForm } from "../NewResumeForm";

export default async function NewResumePage() {
  const session = await getSession();
  if (!session?.user) redirect("/login");

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">New Resume</h1>
      <NewResumeForm
        defaultTitle="My Resume"
        defaultName={session.user.name ?? ""}
        defaultEmail={session.user.email ?? ""}
      />
    </div>
  );
}
