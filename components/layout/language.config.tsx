import { Pathnames } from "next-intl/navigation";

export const locales = ["en", "fa", "tr", "ar", "az", "ru", "es"] as const;

export const pathnames = {
  "/": "/",
} satisfies Pathnames<typeof locales>;

// Use the default: `always`
export const localePrefix = undefined;

export type AppPathnames = keyof typeof pathnames;
