export const security = {
  sessionMaxAge: 30 * 24 * 60 * 60, // 30 days
  bcryptRounds: 10,
  tokenBytes: 32,
} as const;
