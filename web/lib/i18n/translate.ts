import { DEFAULT_LOCALE } from "./config";
import { messages } from "./messages";
import type { Locale } from "../../types/i18n/types";

function getMessage(
  locale: Locale,
  key: string
): string | undefined {
  const parts = key.split(".");

  let current: unknown = messages[locale];

  for (const part of parts) {
    if (
      typeof current !== "object" ||
      current === null ||
      !(part in current)
    ) {
      return undefined;
    }

    current = (current as Record<string, unknown>)[part];
  }

  return typeof current === "string" ? current : undefined;
}

export function translate(locale: Locale, key: string): string {
  return (
    getMessage(locale, key) ??
    getMessage(DEFAULT_LOCALE, key) ??
    key
  );
}