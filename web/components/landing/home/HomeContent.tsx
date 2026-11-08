"use client";

import { useI18n } from "@/components/providers/i18n";
import { Hero } from "./hero";
import { HowItWorks } from "./how-it-works";
import { Features } from "./features";
import { GlobalCoverage } from "./global-coverage";
import { FAQ } from "./faq";
import { CTA } from "./cta";

export function HomeContent() {
  const { locale } = useI18n();

  return (
    <div aria-labelledby="landing-title" className="flex flex-1 flex-col">
      <Hero locale={locale} />

      <HowItWorks locale={locale} />

      <Features locale={locale} />

      <GlobalCoverage locale={locale} />

      <FAQ locale={locale} />

      <CTA locale={locale} />
    </div>
  );
}
