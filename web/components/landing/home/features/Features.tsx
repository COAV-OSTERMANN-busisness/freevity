"use client";

import {
  faArrowLeft,
  faArrowRight,
  faCalculator,
  faChartLine,
  faGlobe,
  faListCheck,
  faScaleBalanced,
  faTableList,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";

import { translate } from "@/lib/i18n/translate";
import type { Locale } from "@/types/i18n/types";

interface FeaturesProps {
  locale: Locale;
}

const features = [
  {
    key: "one",
    icon: faCalculator,
    image:
      "https://images.unsplash.com/photo-1649209979970-f01d950cc5ed?q=80&w=741&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    key: "two",
    icon: faTableList,
    image:
      "https://plus.unsplash.com/premium_photo-1679784204535-e623926075cb?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    key: "three",
    icon: faGlobe,
    image:
      "https://images.unsplash.com/photo-1493946740644-2d8a1f1a6aff?q=80&w=890&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    key: "four",
    icon: faChartLine,
    image:
      "https://plus.unsplash.com/premium_photo-1670213989516-449ccda46fdb?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    key: "five",
    icon: faScaleBalanced,
    image:
      "https://images.unsplash.com/photo-1533237264985-ee62f6d342bb?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    key: "six",
    icon: faListCheck,
    image:
      "https://images.unsplash.com/photo-1669399213378-2853e748f217?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
] as const;

export function Features({ locale }: FeaturesProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: false,
  });

  function scrollPrevious(): void {
    emblaApi?.scrollPrev();
  }

  function scrollNext(): void {
    emblaApi?.scrollNext();
  }

  return (
    <section
      aria-labelledby="features-title"
      className="border-t border-[var(--border)] bg-[var(--background)] px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2
              id="features-title"
              className="text-3xl font-bold tracking-tight text-[var(--text)] sm:text-4xl"
            >
              {translate(locale, "landing.features.title")}
            </h2>

            <p className="mt-4 text-base leading-7 text-[var(--muted)] sm:text-lg">
              {translate(locale, "landing.features.description")}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={scrollPrevious}
              aria-label="Previous"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] shadow-sm transition hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)]"
            >
              <FontAwesomeIcon
                icon={faArrowLeft}
                aria-hidden="true"
                className="h-4 w-4"
              />
            </button>

            <button
              type="button"
              onClick={scrollNext}
              aria-label="Next"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--brand-primary)] text-white shadow-sm transition hover:opacity-90"
            >
              <FontAwesomeIcon
                icon={faArrowRight}
                aria-hidden="true"
                className="h-4 w-4"
              />
            </button>
          </div>
        </div>

        <div ref={emblaRef} className="mt-10 overflow-hidden">
          <div className="-ml-4 flex touch-pan-y">
            {features.map((feature) => (
              <div
                key={feature.key}
                className="min-w-0 flex-[0_0_88%] pl-4 sm:flex-[0_0_72%] md:flex-[0_0_54%] lg:flex-[0_0_50%]"
              >
                <article className="group relative h-[30rem] overflow-hidden rounded-2xl bg-black shadow-md sm:h-[34rem]">
                  <Image
                    src={feature.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 88vw, (max-width: 768px) 72vw, (max-width: 1024px) 54vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />

                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent"
                  />

                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--brand-primary)] text-white shadow-lg">
                      <FontAwesomeIcon
                        icon={feature.icon}
                        aria-hidden="true"
                        className="h-5 w-5"
                      />
                    </div>

                    <h3
                      className="mt-5 max-w-lg text-2xl font-bold leading-tight text-white sm:text-3xl"
                      style={{ color: "#f8fafc", marginTop: "1rem" }}
                    >
                      {translate(
                        locale,
                        `landing.features.items.${feature.key}.title`
                      )}
                    </h3>

                    <p className="mt-3 max-w-xl text-sm leading-6 text-white/90 sm:text-base">
                      {translate(
                        locale,
                        `landing.features.items.${feature.key}.description`
                      )}
                    </p>

                    <div
                      aria-hidden="true"
                      className="mt-6 h-1 w-12 rounded-full bg-[var(--brand-primary)] transition-all duration-300 group-hover:w-20"
                    />
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
