import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Turn API upload paths into absolute URLs for <img src>. */
export function resolveMediaUrl(url?: string | null): string | null {
  if (!url?.trim()) return null;
  const trimmed = url.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
  const origin = apiBase.replace(/\/api\/?$/, '');
  return trimmed.startsWith('/') ? `${origin}${trimmed}` : `${origin}/${trimmed}`;
}

