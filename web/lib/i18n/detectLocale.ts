import { DEFAULT_LOCALE, isSupportedLocale } from "./config";
import type { Locale } from "../../types/i18n/types";

function normalizeLocale(browserLocale: string): Locale | null {
  const locale = browserLocale.toLowerCase().split("-")[0];

  return isSupportedLocale(locale) ? locale : null;
}

export function detectLocale(): Locale {
  if (typeof navigator === "undefined" || !navigator.languages?.length) {
    return DEFAULT_LOCALE;
  }

  for (const browserLocale of navigator.languages) {
    const locale = normalizeLocale(browserLocale);

    if (locale) {
      return locale;
    }
  }

  return DEFAULT_LOCALE;
}
