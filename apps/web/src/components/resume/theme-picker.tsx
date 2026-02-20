"use client";

import { cn } from "@/lib/utils";
import type { ResumeTemplate } from "@/types/resume";

const TEMPLATES: { value: ResumeTemplate; label: string }[] = [
  { value: "classic", label: "Classic" },
  { value: "modern", label: "Modern" },
  { value: "minimal", label: "Minimal" },
];

const THEME_COLORS = [
  "#0284c7",
  "#7c3aed",
  "#dc2626",
  "#16a34a",
  "#ea580c",
  "#0f172a",
  "#db2777",
  "#0891b2",
];

interface ThemePickerProps {
  template: ResumeTemplate;
  themeColor: string;
  onTemplateChange: (t: ResumeTemplate) => void;
  onColorChange: (c: string) => void;
}

export function ThemePicker({
  template,
  themeColor,
  onTemplateChange,
  onColorChange,
}: ThemePickerProps) {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">Template</p>
        <div className="flex gap-2 flex-wrap">
          {TEMPLATES.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => onTemplateChange(t.value)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm border transition-colors",
                template === t.value
                  ? "border-primary-600 bg-primary-50 text-primary-700 font-medium"
                  : "border-gray-300 text-gray-600 hover:border-gray-400"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">Theme Color</p>
        <div className="flex gap-2 flex-wrap">
          {THEME_COLORS.map((color) => (
            <button
              key={color}
              type="button"
              title={color}
              onClick={() => onColorChange(color)}
              className={cn(
                "w-7 h-7 rounded-full border-2 transition-all",
                themeColor === color ? "border-gray-900 scale-110" : "border-transparent hover:scale-105"
              )}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
