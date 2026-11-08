"use client";

import {
  faInstagram,
  faLinkedinIn,
  faXTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

import { Logo } from "@/components/ui/logo";
import { useI18n } from "@/components/providers/i18n";
import { messages } from "@/lib/i18n/messages";

export type FooterLinkKey = keyof typeof messages.en.common.footer;

export interface FooterLink {
  labelKey: FooterLinkKey;
  href: string;
}

export interface FooterProps {
  links?: readonly FooterLink[];
  copyright?: string;
}

const socialLinks = [
  {
    label: "YouTube",
    icon: faYoutube,
    href: "#",
  },
  {
    label: "LinkedIn",
    icon: faLinkedinIn,
    href: "#",
  },
  {
    label: "X",
    icon: faXTwitter,
    href: "#",
  },
  {
    label: "Instagram",
    icon: faInstagram,
    href: "#",
  },
] as const;

export function Footer({ links = [], copyright }: FooterProps) {
  const { locale } = useI18n();
  const translations = messages[locale].common.footer;

  const resolvedCopyright = copyright ?? translations.copyright;

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Logo variant="text" href="/" width={150} />
          </div>

          {links.length > 0 && (
            <div>
              <div
                className="mb-4"
                style={{
                  color: "var(--color-text)",
                  fontSize: "18px",
                  fontWeight: 600,
                  lineHeight: 1.3,
                }}
              >
                {translations.navigationTitle}
              </div>

              <nav aria-label={translations.navigationTitle}>
                <ul className="flex flex-col gap-3">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm font-medium transition-colors hover:text-[var(--color-primary)]"
                        style={{ color: "var(--color-text)" }}
                      >
                        {translations[link.labelKey]}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          )}

          <div>
            <div
              className="mb-4"
              style={{
                color: "var(--color-text)",
                fontSize: "18px",
                fontWeight: 600,
                lineHeight: 1.3,
              }}
            >
              {translations.socialTitle}
            </div>

            <nav aria-label={translations.socialTitle}>
              <ul className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      aria-label={social.label}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-primary)] transition-colors hover:bg-[var(--color-primary-dark)]"
                    >
                      <FontAwesomeIcon
                        icon={social.icon}
                        aria-hidden="true"
                        className="h-4 w-4 text-[var(--color-surface)]"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-between border-t border-[var(--color-border)] pt-6">
          <p
            className="text-[var(--color-muted)]"
            style={{
              fontSize: "1rem",
              lineHeight: 1.5,
            }}
          >
            {resolvedCopyright}
          </p>

          <span
            className="rounded-full border border-[var(--color-border)] bg-[var(--color-background)]"
            style={{
              color: "var(--color-text)",
              fontSize: "0.875rem",
              fontWeight: 600,
              lineHeight: 1.25,
              padding: "0.5rem 0.875rem",
            }}
          >
            Ostermann
          </span>
        </div>
      </div>
    </footer>
  );
}
