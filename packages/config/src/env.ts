function getEnv(key: string, defaultValue?: string): string {
  const v = process.env[key] ?? defaultValue;
  if (v === undefined) throw new Error(`Missing env: ${key}`);
  return v;
}

export const env = {
  NODE_ENV: process.env.NODE_ENV ?? "development",
  DATABASE_URL: getEnv("DATABASE_URL", "postgresql://user:password@localhost:5432/kodnestcareers"),
  REDIS_URL: getEnv("REDIS_URL", "redis://localhost:6379"),
  NEXTAUTH_SECRET: getEnv("NEXTAUTH_SECRET", "dev-secret-change-in-production"),
  NEXTAUTH_URL: getEnv("NEXTAUTH_URL", "http://localhost:3000"),
  MAIL_HOST: getEnv("MAIL_HOST", "localhost"),
  MAIL_PORT: Number(getEnv("MAIL_PORT", "1025")),
  MAIL_USER: process.env.MAIL_USER ?? "",
  MAIL_PASS: process.env.MAIL_PASS ?? "",
} as const;

export const isDev = env.NODE_ENV === "development";
