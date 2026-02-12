// Simple validators (no zod dependency to keep shared light; add zod in app layer if needed)

export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export function minLength(str: string, min: number): boolean {
  return str.length >= min;
}

export function maxLength(str: string, max: number): boolean {
  return str.length <= max;
}

export const PASSWORD_MIN = 8;
export const NAME_MAX = 200;
export const TITLE_MAX = 500;
