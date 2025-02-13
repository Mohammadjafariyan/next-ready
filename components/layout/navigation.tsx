import {
  createLocalizedPathnamesNavigation,
  createSharedPathnamesNavigation,
} from "next-intl/navigation";
import { locales, pathnames, localePrefix } from "./language.config";

export const { Link, redirect, usePathname, useRouter } =
  createLocalizedPathnamesNavigation({
    locales,
    pathnames,
    localePrefix,
  });
