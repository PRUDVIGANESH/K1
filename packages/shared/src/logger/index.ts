const isDev = process.env.NODE_ENV !== "production";

export const logger = {
  info: (msg: string, meta?: Record<string, unknown>) => {
    console.log(`[INFO] ${msg}`, meta ?? "");
  },
  warn: (msg: string, meta?: Record<string, unknown>) => {
    console.warn(`[WARN] ${msg}`, meta ?? "");
  },
  error: (msg: string, err?: unknown, meta?: Record<string, unknown>) => {
    console.error(`[ERROR] ${msg}`, err ?? "", meta ?? "");
  },
  debug: (msg: string, meta?: Record<string, unknown>) => {
    if (isDev) console.debug(`[DEBUG] ${msg}`, meta ?? "");
  },
};
