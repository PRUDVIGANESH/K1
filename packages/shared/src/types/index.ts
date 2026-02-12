// Common domain types and API shapes

export type Id = string;

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface ApiResponse<T> {
  data?: T;
  error?: { code: string; message: string };
}

// Auth
export interface UserProfile {
  id: Id;
  email: string;
  name: string | null;
  createdAt: string;
}

// Jobs
export type JobStatus = "saved" | "applied" | "interviewing" | "offered" | "rejected";

export interface JobListing {
  id: Id;
  source: string;
  externalId: string | null;
  title: string;
  company: string;
  url: string | null;
  description: string | null;
  postedAt: string | null;
  createdAt: string;
}

export interface SavedJob extends JobListing {
  status: JobStatus;
  appliedAt: string | null;
  savedAt: string;
}

// Resume
export interface ResumeSection {
  type: string;
  title: string;
  content: string;
}

export interface ResumeData {
  fullName: string;
  email: string;
  phone: string;
  summary: string;
  sections: ResumeSection[];
  skills: string[];
}

// Readiness
export interface ReadinessScore {
  id: Id;
  userId: Id;
  overall: number;
  breakdown: Record<string, number>;
  createdAt: string;
}

// Notifications
export interface NotificationItem {
  id: Id;
  type: string;
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
}

// Analytics
export interface DashboardStats {
  savedJobs: number;
  applications: number;
  resumes: number;
  readinessScore: number | null;
  unreadNotifications: number;
}
