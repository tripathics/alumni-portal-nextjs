import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function userAvatarUrl(avatar: string) {
  if (avatar.startsWith("http")) {
    return avatar;
  }
  if (avatar.includes("blob:")) {
    return avatar;
  }
  return `${process.env.NEXT_PUBLIC_API_URL}/media/${avatar}`;
}

export function signUrl(sign: string) {
  return `${process.env.NEXT_PUBLIC_API_URL}/media/${sign}`;
}

export function heroImageUrl(hero_image?: string | null) {
  if (!hero_image) return;
  if (hero_image.includes("blob:")) {
    return hero_image;
  }
  return `${process.env.NEXT_PUBLIC_API_URL}/media/${hero_image}`;
}
