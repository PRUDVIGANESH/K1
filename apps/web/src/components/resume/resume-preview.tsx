"use client";

import type { ResumeProfile, ResumeTemplate } from "@/types/resume";
import { ClassicTemplate } from "./templates/classic";
import { ModernTemplate } from "./templates/modern";
import { MinimalTemplate } from "./templates/minimal";

interface ResumePreviewProps {
  resume: ResumeProfile;
  template: ResumeTemplate;
  themeColor: string;
}

export function ResumePreview({ resume, template, themeColor }: ResumePreviewProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-auto shadow-sm" style={{ minHeight: "600px" }}>
      {template === "classic" && <ClassicTemplate resume={resume} themeColor={themeColor} />}
      {template === "modern" && <ModernTemplate resume={resume} themeColor={themeColor} />}
      {template === "minimal" && <MinimalTemplate resume={resume} themeColor={themeColor} />}
    </div>
  );
}
