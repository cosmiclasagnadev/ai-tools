import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const capitalizeAndRemoveHyphen = (str: string) => {
  const finalString = str
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");

  if (finalString.endsWith("Tool")) {
    return finalString.slice(0, -4);
  }
  return finalString;
};

export const removeHyphens = (str: string) => {
  return str.replace(/-/g, " ");
};

export const generateCategoryHeroContent = (category: string) => {
  // if category has "ai" at the end, remove it
  if (category.endsWith("ai")) {
    category = category.slice(0, -2);
  } else if (category.endsWith("tool")) {
    category = category.slice(0, -4);
  }
  return {
    heroTitle: `AI ${capitalizeAndRemoveHyphen(category)} Tools`,
    heroDescription: `
    This collection contains a variety of AI ${removeHyphens(
      category
    )} tools that can be used in your next project. From simple to more complex ones, this collection has everything you need to get started.
  `,
  };
};

export const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

export const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);
