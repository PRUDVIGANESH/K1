export interface UserPreferences {
  roleKeywords: string[];
  preferredLocations: string[];
  preferredMode: string | null;
  experienceLevel: string | null;
  skills: string[];
  minMatchScore: number;
}

export interface JobForScoring {
  title: string;
  description: string | null;
  location: string | null;
  mode: string | null;
  experienceLevel: string | null;
  skills: string[];
  salaryMin: number | null;
  salaryMax: number | null;
}
