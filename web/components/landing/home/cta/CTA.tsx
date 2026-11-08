import Image from "next/image";
import Link from "next/link";
import { translate } from "@/lib/i18n/translate";
import type { Locale } from "@/types/i18n/types";

interface CTAProps {
  locale: Locale;
}

export function CTA({ locale }: CTAProps) {
  return (
    <section
      aria-labelledby="cta-title"
      className="border-t border-[var(--brand-primary-dark)] bg-[var(--brand-primary)] px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto grid w-full max-w-7xl overflow-hidden rounded-2xl border border-[var(--brand-primary)] bg-[var(--brand-primary-dark)] shadow-lg lg:grid-cols-2">
        <div className="flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-12 lg:py-12">
          <h2
            id="cta-title"
            className="text-3xl font-bold tracking-tight text-[var(--surface)] sm:text-4xl"
          >
            {translate(locale, "landing.cta.title")}
          </h2>

          <p className="mt-4 max-w-xl text-base leading-7 text-[var(--surface)] sm:text-lg">
            {translate(locale, "landing.cta.description")}
          </p>

          <Link
            href="/calculator"
            className="mt-8 inline-flex w-fit items-center justify-center rounded-lg bg-[var(--surface)] px-8 py-3 font-semibold text-[var(--brand-primary)] shadow-sm transition-colors hover:bg-[var(--background)] hover:text-[var(--brand-primary-dark)] active:bg-[var(--border)]"
            style={{ color: "var(--brand-primary-dark)" }}
          >
            {translate(locale, "landing.cta.button")}
          </Link>
        </div>

        <div className="relative min-h-64 lg:min-h-full">
          <Image
            src="https://images.unsplash.com/photo-1759216373394-91146ca977c7?auto=format&fit=crop&w=1200&q=80"
            alt={translate(locale, "landing.cta.imageAlt")}
            fill
            className="object-cover"
            sizes="(max-width: 1023px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
