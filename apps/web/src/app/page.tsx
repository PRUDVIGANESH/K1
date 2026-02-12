import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { HeroSection } from "@/components/landing/hero";
import { FeatureSection } from "@/components/landing/features";

export default async function Home() {
  const session = await getSession();
  if (session?.user) redirect("/dashboard");

  return (
    <>
      <HeroSection />
      <FeatureSection />
    </>
  );
}
