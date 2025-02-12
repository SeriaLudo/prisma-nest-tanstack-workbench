import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getJoinedCategory = (joinedDate: string): string => {
  const currentDate = new Date();
  const joined = new Date(joinedDate);

  // Get the difference in days between current date and the joined date
  const diffTime = Math.abs(currentDate.getTime() - joined.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 3600 * 24));

  // Grouping logic
  if (joined < currentDate) return "Past Due";
  if (diffDays === 0) return "Today";
  if (diffDays <= 7) return "This Week";
  if (diffDays <= 14) return "Next Week";
  if (joined.getMonth() === currentDate.getMonth()) return "This Month";
  if (joined.getMonth() === currentDate.getMonth() + 1) return "Next Month";
  return "Later";
};