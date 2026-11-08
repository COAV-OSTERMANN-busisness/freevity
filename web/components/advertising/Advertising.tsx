"use client";

import { messages } from "@/lib/i18n/messages";
import { useI18n } from "@/components/providers/i18n";
import type { AdvertisingProps } from "@/types/advertising/Advertising.types";

export function Advertising({
  provider,
  format,
  imageUrl,
  targetUrl,
  slot,
  campaignId,
  className = "",
}: AdvertisingProps) {
  const { locale } = useI18n();
  const translations = messages[locale].calculator.advertising;

  const advertisingContent = imageUrl ? (
    <img
      src={imageUrl}
      alt={translations.label}
      className="h-auto max-h-32 w-full object-contain"
    />
  ) : (
    <span className="text-sm" style={{ color: "var(--color-muted)" }}>
      {translations.label}
    </span>
  );

  return (
    <section
      aria-label={translations.label}
      data-provider={provider}
      data-format={format}
      data-slot={slot}
      data-campaign-id={campaignId}
      className={`w-full ${className}`}
    >
      <div className="mx-auto flex min-h-24 w-full max-w-7xl items-center justify-center overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
        {targetUrl ? (
          <a
            href={targetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center"
            aria-label={translations.label}
          >
            {advertisingContent}
          </a>
        ) : (
          advertisingContent
        )}
      </div>
    </section>
  );
}
