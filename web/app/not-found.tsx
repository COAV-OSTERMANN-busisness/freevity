"use client";

import Image from "next/image";
import Link from "next/link";

import { Logo } from "@/components/ui/logo";
import { useI18n } from "@/components/providers/i18n";
import { messages } from "@/lib/i18n/messages";

export default function NotFound() {
  const { locale } = useI18n();
  const translations = messages[locale].notFound;

  return (
    <main
      style={{ marginTop: "5rem" }}
      className="flex min-h-[calc(100vh-4rem)] items-stretch px-4 py-4 sm:px-6 lg:px-8"
    >
      <section
        aria-labelledby="not-found-title"
        className="mx-auto grid w-full max-w-7xl overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] md:grid-cols-2"
      >
        <div className="flex flex-col justify-between p-8 sm:p-10 lg:p-12">
          <Logo variant="text" href="/" width={150} />

          <div className="max-w-xl py-12 md:py-0">
            <p className="text-lg font-semibold text-[var(--color-primary)]">
              {translations.code}
            </p>

            <h1
              id="not-found-title"
              className="mt-4 text-5xl font-bold tracking-tight text-[var(--color-text)] sm:text-6xl"
            >
              {translations.title}
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-[var(--color-muted)] sm:text-lg">
              {translations.description}
            </p>

            <Link
              href="/"
              className="mt-8 inline-flex items-center font-semibold transition-colors hover:text-[var(--color-primary-dark)]"
              style={{ color: "var(--color-primary)" }}
            >
              {translations.backToHome}
            </Link>
          </div>
        </div>

        <div className="relative min-h-[22rem] md:min-h-full">
          <Image
            src="https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1200&q=80"
            alt={translations.imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 767px) 100vw, 50vw"
            priority
          />
        </div>
      </section>
    </main>
  );
}
