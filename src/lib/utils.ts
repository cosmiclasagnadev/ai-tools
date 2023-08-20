import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const capitalizeAndRemoveHyphen = (str: string) => {
  return str
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
};

export const removeHyphens = (str: string) => {
  return str.replace(/-/g, " ");
};

export const generateCategoryHeroContent = (category: string) => {
  // if category has "ai" at the end, remove it
  if (category.endsWith("ai")) {
    category = category.slice(0, -2);
  }
  return {
    heroTitle: `${capitalizeAndRemoveHyphen(category)} AI Tools`,
    heroDescription: `
    This collection contains a variety of ${removeHyphens(
      category
    )} AI tools that can be used in your next project. From simple to more complex ones, this collection has everything you need to get started.
  `,
  };
};
