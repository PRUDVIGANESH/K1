import type { UserPreferences, JobForScoring } from "../types/preferences";

export interface MatchResult {
  score: number;
  breakdown: {
    titleMatch: number;
    skillsMatch: number;
    locationMatch: number;
    modeMatch: number;
    experienceMatch: number;
  };
}

function normalizeString(s: string): string {
  return s.toLowerCase().trim();
}

function tokenOverlap(a: string[], b: string[]): number {
  if (a.length === 0 || b.length === 0) return 0;
  const setA = new Set(a.map(normalizeString));
  const matches = b.filter((item) => setA.has(normalizeString(item))).length;
  return Math.round((matches / Math.max(a.length, b.length)) * 100);
}

function titleContainsKeyword(title: string, keywords: string[]): number {
  if (keywords.length === 0) return 50;
  const lower = normalizeString(title);
  const matched = keywords.filter((kw) => lower.includes(normalizeString(kw))).length;
  return Math.round((matched / keywords.length) * 100);
}

export function calculateMatchScore(job: JobForScoring, prefs: UserPreferences): MatchResult {
  const titleMatch = titleContainsKeyword(job.title, prefs.roleKeywords);

  const jobSkills = job.skills ?? [];
  const prefSkills = prefs.skills ?? [];
  const descriptionSkills: string[] = [];
  if (job.description) {
    const desc = normalizeString(job.description);
    prefSkills.forEach((skill) => {
      if (desc.includes(normalizeString(skill))) {
        descriptionSkills.push(skill);
      }
    });
  }
  const allJobSkills = [...new Set([...jobSkills, ...descriptionSkills])];
  const skillsMatch = prefSkills.length > 0 ? tokenOverlap(prefSkills, allJobSkills) : 50;

  const prefLocs = prefs.preferredLocations ?? [];
  let locationMatch = 50;
  if (prefLocs.length > 0 && job.location) {
    const jobLoc = normalizeString(job.location);
    const matched = prefLocs.some((loc) => jobLoc.includes(normalizeString(loc)));
    locationMatch = matched ? 100 : 0;
  }

  let modeMatch = 50;
  if (prefs.preferredMode && job.mode) {
    modeMatch = normalizeString(job.mode) === normalizeString(prefs.preferredMode) ? 100 : 0;
  }

  let experienceMatch = 50;
  if (prefs.experienceLevel && job.experienceLevel) {
    experienceMatch =
      normalizeString(job.experienceLevel) === normalizeString(prefs.experienceLevel) ? 100 : 20;
  }

  const score = Math.round(
    titleMatch * 0.3 +
      skillsMatch * 0.35 +
      locationMatch * 0.15 +
      modeMatch * 0.1 +
      experienceMatch * 0.1
  );

  return {
    score,
    breakdown: { titleMatch, skillsMatch, locationMatch, modeMatch, experienceMatch },
  };
}

export function getScoreColor(score: number): string {
  if (score >= 75) return "text-green-600";
  if (score >= 50) return "text-yellow-600";
  return "text-red-500";
}

export function getScoreBg(score: number): string {
  if (score >= 75) return "bg-green-100 text-green-700";
  if (score >= 50) return "bg-yellow-100 text-yellow-700";
  return "bg-red-100 text-red-600";
}
