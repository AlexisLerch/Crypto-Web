import { clsx, type ClassValue } from "clsx";
import { Time } from "lightweight-charts";
import { twMerge } from "tailwind-merge";

/**
 * Merge multiple class-name inputs into a single normalized class string.
 *
 * @returns The combined class string with conflicting Tailwind classes resolved.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(
  value: number | null | undefined,
  digits?: number,
  currency?: string,
  showSymbol?: boolean
) {
  if (value === null || value === undefined || isNaN(value)) {
    return showSymbol !== false ? "$0.00" : "0.00";
  }

  if (showSymbol === undefined || showSymbol === true) {
    return value.toLocaleString(undefined, {
      style: "currency",
      currency: currency?.toUpperCase() || "USD",
      minimumFractionDigits: digits ?? 2,
      maximumFractionDigits: digits ?? 2,
    });
  }
  return value.toLocaleString(undefined, {
    minimumFractionDigits: digits ?? 2,
    maximumFractionDigits: digits ?? 2,
  });
}

export function formatPercentage(change: number | null | undefined): string {
  if (change === null || change === undefined || isNaN(change)) {
    return "0.0%";
  }
  const formattedChange = change.toFixed(1);
  return `${formattedChange}%`;
}

export function trendingClasses(value: number) {
  const isTrendingUp = value > 0;

  return {
    textClass: isTrendingUp ? "text-green-400" : "text-red-400",
    bgClass: isTrendingUp ? "bg-green-500/10" : "bg-red-500/10",
    iconClass: isTrendingUp ? "icon-up" : "icon-down",
  };
}

/**
 * Converts a date into a concise human-readable relative time string.
 *
 * @param date - The date to compare to now; may be a `Date`, an ISO date string, or a millisecond timestamp.
 * @returns `'just now'` for times under 60 seconds; `'<N> min'` for minutes under 60; `'<N> hour(s)'` for hours under 24; `'<N> day(s)'` for days under 7; `'<N> week(s)'` for weeks under 4; otherwise the date formatted as `YYYY-MM-DD`.
 */
export function timeAgo(date: string | number | Date): string {
  const now = new Date();
  const past = new Date(date);
  const diff = now.getTime() - past.getTime(); // difference in ms

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);

  if (seconds < 60) return "just now";
  if (minutes < 60) return `${minutes} min`;
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""}`;
  if (days < 7) return `${days} day${days > 1 ? "s" : ""}`;
  if (weeks < 4) return `${weeks} week${weeks > 1 ? "s" : ""}`;

  // Format date as YYYY-MM-DD
  return past.toISOString().split("T")[0];
}

/**
 * Convert an array of OHLCData tuples into chart-ready objects with `Time`-typed timestamps and numeric `open`/`high`/`low`/`close`.
 *
 * @param data - Array of OHLCData tuples in the form `[time, open, high, low, close]` where `time` is expressed in seconds.
 * @returns An array of objects `{ time, open, high, low, close }` typed for charting; consecutive entries with the same `time` are removed.
 */
export function convertOHLCData(data: OHLCData[]) {
  return data
    .map((d) => ({
      time: d[0] as Time, // ensure seconds, not ms
      open: d[1],
      high: d[2],
      low: d[3],
      close: d[4],
    }))
    .filter(
      (item, index, arr) => index === 0 || item.time !== arr[index - 1].time
    );
}

export const ELLIPSIS = "ellipsis" as const;
export const buildPageNumbers = (
  currentPage: number,
  totalPages: number
): (number | typeof ELLIPSIS)[] => {
  const MAX_VISIBLE_PAGES = 5;

  const pages: (number | typeof ELLIPSIS)[] = [];

  if (totalPages <= MAX_VISIBLE_PAGES) {
    for (let i = 1; i <= totalPages; i += 1) {
      pages.push(i);
    }
    return pages;
  }

  pages.push(1);

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  if (start > 2) {
    pages.push(ELLIPSIS);
  }

  for (let i = start; i <= end; i += 1) {
    pages.push(i);
  }

  if (end < totalPages - 1) {
    pages.push(ELLIPSIS);
  }

  pages.push(totalPages);

  return pages;
};