"use client";

import { useEffect, useRef, useState } from "react";

import { messages } from "@/lib/i18n/messages";
import {
  calculateFreightSimulation,
  calculateVolume,
  calculateVolumetricWeight,
  resolveFreightContext,
} from "@/lib/calculation/freight";
import {
  convertLength,
  convertMass,
  type LengthUnit,
  type MassUnit,
} from "@/lib/conversion";

import { useI18n } from "@/components/providers/i18n";

import type { CalculationResult } from "@/types/calculation/landedCost/calculationResult";
import type { FreightResult } from "@/types/calculation/freight/freightResult";
import type {
  FreightCalculationInput,
  FreightTransportMode,
} from "@/types/calculation/freight/freightCalculationInput";
import type { AdditionalFreightCharge } from "@/types/calculation/freight/additionalFreightCharge";
import type { MaritimeFreightType } from "@/types/calculation/freight/maritimeFreight";
import type { FreightTariffBasis } from "@/types/calculation/freight/freightTariff";

import { FreightCalculatorForm } from "./freight";
import { CalculatorResult } from "./CalculatorResult";

interface CalculatorWorkspaceProps {
  // Mantido para compatibilidade com app/calculator/page.tsx.
  // Reservado para a futura reativação do Landed Cost.
  landedCostResult?: CalculationResult;
  freightResult?: FreightResult;
}

interface FreightFormData {
  originCountry: string;
  destinationCountry: string;
  mode: FreightTransportMode;
  quantity: number;
  weight: number;
  weightUnit: MassUnit;
  length: number;
  lengthUnit: LengthUnit;
  width: number;
  widthUnit: LengthUnit;
  height: number;
  heightUnit: LengthUnit;
  tariffBasis: FreightTariffBasis;
  tariffRate: number;
  volumetricDivisor?: number;
  maritimeType?: MaritimeFreightType;
  containerQuantity?: number;
  additionalCharges: AdditionalFreightCharge[];
}

interface GeocodeResponse {
  latitude: number;
  longitude: number;
  countryCode: string;
}

interface RoadDistanceResponse {
  distanceKm: number;
  origin: GeocodeResponse;
  destination: GeocodeResponse;
}

interface ResolvedFreightContext {
  originCountry: string;
  destinationCountry: string;
  scope: FreightCalculationInput["scope"];
  currency: string;
}

type FreightCalculationStatus = "idle" | "loading" | "success" | "error";

function buildFreightCalculationInput(
  data: FreightFormData,
  context: ResolvedFreightContext
): FreightCalculationInput {
  // Normalização física: realizada uma única vez.
  const actualWeightKg = convertMass(data.weight, data.weightUnit, "kg");

  const lengthMeters = convertLength(data.length, data.lengthUnit, "m");

  const widthMeters = convertLength(data.width, data.widthUnit, "m");

  const heightMeters = convertLength(data.height, data.heightUnit, "m");

  const volumeM3 = calculateVolume({
    length: lengthMeters,
    width: widthMeters,
    height: heightMeters,
  });

  const tariff = {
    basis: data.tariffBasis,
    rate: {
      amount: data.tariffRate,
      currency: context.currency,
    },
  };

  const additionalCharges = data.additionalCharges.map((charge) => ({
    ...charge,
    amount: {
      ...charge.amount,
      currency: context.currency,
    },
  }));

  const route = {
    originCountry: context.originCountry,
    destinationCountry: context.destinationCountry,
  };

  if (data.mode === "road") {
    // Vt = C × L × A × Q.
    // O peso informado já representa toda a remessa.
    const totalVolumeM3 = volumeM3 * data.quantity;

    return {
      scope: context.scope,
      mode: "road",
      route,
      road: {
        actualWeight: actualWeightKg,
        volume: totalVolumeM3,
        quantity: data.quantity,
        tariff,
      },
      additionalCharges,
    };
  }

  if (data.mode === "air") {
    if (data.volumetricDivisor === undefined) {
      throw new Error("Air freight volumetric divisor is required.");
    }

    const volumetricWeight = calculateVolumetricWeight({
      length: convertLength(lengthMeters, "m", "cm"),
      width: convertLength(widthMeters, "m", "cm"),
      height: convertLength(heightMeters, "m", "cm"),
      divisor: data.volumetricDivisor,
    });

    return {
      scope: context.scope,
      mode: "air",
      route,
      air: {
        actualWeight: actualWeightKg,
        volumetricWeight: volumetricWeight.value,
        volume: volumeM3 * data.quantity,
        quantity: data.quantity,
        tariff,
      },
      additionalCharges,
    };
  }

  if (!data.maritimeType) {
    throw new Error("Maritime freight type is required.");
  }

  if (data.maritimeType === "fcl") {
    if (data.containerQuantity === undefined) {
      throw new Error("FCL container quantity is required.");
    }

    return {
      scope: context.scope,
      mode: "maritime",
      route,
      maritime: {
        type: "fcl",
        fcl: {
          tariff,
          containerQuantity: data.containerQuantity,
        },
      },
      additionalCharges,
    };
  }

  return {
    scope: context.scope,
    mode: "maritime",
    route,
    maritime: {
      type: "lcl",
      lcl: {
        actualWeight: actualWeightKg,
        volume: volumeM3,
        tariff,
      },
    },
    additionalCharges,
  };
}

async function geocodeLocation(location: string): Promise<GeocodeResponse> {
  const response = await fetch("/api/geocode", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ location }),
  });

  if (!response.ok) {
    throw new Error(`Unable to geocode "${location}".`);
  }

  return (await response.json()) as GeocodeResponse;
}

async function resolveCountries(data: FreightFormData): Promise<{
  originCountry: string;
  destinationCountry: string;
  distanceKm?: number;
}> {
  if (data.mode === "road") {
    const response = await fetch("/api/road-distance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        origin: data.originCountry,
        destination: data.destinationCountry,
      }),
    });

    if (!response.ok) {
      throw new Error("Unable to calculate road distance.");
    }

    const result = (await response.json()) as RoadDistanceResponse;

    return {
      originCountry: result.origin.countryCode,
      destinationCountry: result.destination.countryCode,
      distanceKm: result.distanceKm,
    };
  }

  const [origin, destination] = await Promise.all([
    geocodeLocation(data.originCountry),
    geocodeLocation(data.destinationCountry),
  ]);

  return {
    originCountry: origin.countryCode,
    destinationCountry: destination.countryCode,
  };
}

export function CalculatorWorkspace({
  freightResult,
}: CalculatorWorkspaceProps) {
  const { locale } = useI18n();

  const [calculatedFreightResult, setCalculatedFreightResult] = useState<
    FreightResult | undefined
  >(freightResult);

  const [freightStatus, setFreightStatus] =
    useState<FreightCalculationStatus>("idle");

  const [showFreightFeedback, setShowFreightFeedback] = useState(false);

  const freightResultRef = useRef<HTMLElement>(null);
  const freightSubmissionInProgress = useRef(false);

  const calculatorTranslations = messages[locale].calculator;

  useEffect(() => {
    if (freightStatus !== "success") {
      return;
    }

    freightResultRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    freightResultRef.current?.focus({
      preventScroll: true,
    });
  }, [freightStatus]);

  useEffect(() => {
    if (freightStatus !== "success" || !showFreightFeedback) {
      return;
    }

    const timeout = setTimeout(() => {
      setShowFreightFeedback(false);
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [freightStatus, showFreightFeedback]);

  async function handleFreightSubmit(data: FreightFormData): Promise<void> {
    if (freightSubmissionInProgress.current) {
      return;
    }

    freightSubmissionInProgress.current = true;
    setShowFreightFeedback(false);
    setCalculatedFreightResult(undefined);
    setFreightStatus("loading");

    try {
      const locationContext = await resolveCountries(data);

      const freightContext = resolveFreightContext(
        locationContext.originCountry,
        locationContext.destinationCountry
      );

      const freightCalculationInput = buildFreightCalculationInput(data, {
        originCountry: freightContext.originCountry,
        destinationCountry: freightContext.destinationCountry,
        scope: freightContext.scope,
        currency: freightContext.currency,
      });

      const result = calculateFreightSimulation(freightCalculationInput);

      setCalculatedFreightResult(result);
      setShowFreightFeedback(true);
      setFreightStatus("success");
    } catch (error) {
      console.error("Freight calculation failed:", error);

      setCalculatedFreightResult(undefined);
      setShowFreightFeedback(true);
      setFreightStatus("error");
    } finally {
      freightSubmissionInProgress.current = false;
    }
  }

  return (
    <>
      {/*
        Reserva para futura reativação do CalculatorSwitcher
        e do formulário Landed Cost.

        No momento, apenas Freight permanece ativo.
        O formulário Landed Cost não é importado nem renderizado.
      */}

      <section
        aria-label="Calculator"
        className="border-b border-[var(--color-border)] bg-[var(--color-background)] px-4 py-12 sm:px-6 lg:px-8"
      >
        <div className="mx-auto w-full max-w-5xl">
          <FreightCalculatorForm
            onSubmit={handleFreightSubmit}
            isLoading={freightStatus === "loading"}
          />

          {freightStatus === "loading" && (
            <div
              role="status"
              aria-live="polite"
              className="mt-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5"
            >
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-blue-200 border-t-blue-600"
                />

                <div>
                  <p className="font-semibold">
                    {calculatorTranslations.freight.feedback.loading}
                  </p>

                  <p className="mt-1 text-sm">
                    {calculatorTranslations.freight.feedback.loadingDescription}
                  </p>
                </div>
              </div>
            </div>
          )}

          {freightStatus === "error" && showFreightFeedback && (
            <div
              role="alert"
              className="mt-6 flex items-start justify-between gap-4 rounded-xl border border-red-300 bg-red-50 p-5 text-red-800"
            >
              <div>
                <p className="font-medium">
                  {calculatorTranslations.freight.feedback.error}
                </p>

                {/* <p className="mt-2 text-sm">
                  {calculatorTranslations.freight.feedback.retry}
                </p> */}
              </div>

              <button
                type="button"
                onClick={() => setShowFreightFeedback(false)}
                aria-label="Fechar"
                className="shrink-0 rounded p-1 text-red-800 transition hover:bg-red-100 focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {calculatedFreightResult && freightStatus === "success" && (
        <section
          ref={freightResultRef}
          tabIndex={-1}
          aria-label="Freight simulation result"
          className="bg-[var(--color-surface)] px-4 py-12 outline-none sm:px-6 lg:px-8"
        >
          <div className="mx-auto w-full max-w-5xl">
            {showFreightFeedback && (
              <div
                role="status"
                className="mb-5 flex items-center justify-between gap-4 rounded-lg border border-green-300 bg-green-50 px-4 py-3 text-sm font-medium text-green-800"
              >
                <span>{calculatorTranslations.freight.feedback.success}</span>

                <button
                  type="button"
                  onClick={() => setShowFreightFeedback(false)}
                  aria-label="Fechar"
                  className="shrink-0 rounded p-1 text-green-800 transition hover:bg-green-100 focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
            )}

            <CalculatorResult result={calculatedFreightResult} />
          </div>
        </section>
      )}
    </>
  );
}
