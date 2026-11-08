"use client";

import { useState, type FormEvent } from "react";

import { useI18n } from "@/components/providers/i18n";
import { messages } from "@/lib/i18n/messages";

interface CalculatorFormState {
  origin: string;
  destination: string;
  transportMode: "air" | "road" | "maritime";
  weight: string;
  weightUnit: "kg" | "g" | "lb";
  quantity: string;
  cargoValue: string;
  freight: string;
  insurance: string;
  customs: string;
  handling: string;
  localTransport: string;
  otherCosts: string;
}

const initialState: CalculatorFormState = {
  origin: "",
  destination: "",
  transportMode: "road",
  weight: "",
  weightUnit: "kg",
  quantity: "",
  cargoValue: "",
  freight: "",
  insurance: "",
  customs: "",
  handling: "",
  localTransport: "",
  otherCosts: "",
};

export function CalculatorForm() {
  const { locale } = useI18n();
  const translations = messages[locale].calculator.form;

  const [form, setForm] = useState<CalculatorFormState>(initialState);

  function updateField<K extends keyof CalculatorFormState>(
    field: K,
    value: CalculatorFormState[K]
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-sm sm:p-8"
    >
      <div className="border-b border-[var(--color-border)] pb-6">
        <h1
          className="text-2xl font-bold sm:text-3xl"
          style={{ color: "var(--color-text)" }}
        >
          {translations.title}
        </h1>

        <p
          className="mt-2 text-sm leading-6 sm:text-base"
          style={{ color: "var(--color-muted)" }}
        >
          {translations.description}
        </p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="lg:col-span-2">
          <label
            htmlFor="origin"
            className="mb-2 block text-sm font-medium"
            style={{ color: "var(--color-text)" }}
          >
            {translations.origin}
          </label>

          <input
            id="origin"
            name="origin"
            type="text"
            value={form.origin}
            onChange={(event) => updateField("origin", event.target.value)}
            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm outline-none transition focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/20"
          />
        </div>

        <div className="lg:col-span-2">
          <label
            htmlFor="destination"
            className="mb-2 block text-sm font-medium"
            style={{ color: "var(--color-text)" }}
          >
            {translations.destination}
          </label>

          <input
            id="destination"
            name="destination"
            type="text"
            value={form.destination}
            onChange={(event) => updateField("destination", event.target.value)}
            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm outline-none transition focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/20"
          />
        </div>

        <div>
          <label
            htmlFor="transportMode"
            className="mb-2 block text-sm font-medium"
            style={{ color: "var(--color-text)" }}
          >
            {translations.transportMode}
          </label>

          <select
            id="transportMode"
            name="transportMode"
            value={form.transportMode}
            onChange={(event) =>
              updateField(
                "transportMode",
                event.target.value as CalculatorFormState["transportMode"]
              )
            }
            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm outline-none transition focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/20"
          >
            <option value="road">{translations.road}</option>
            <option value="air">{translations.air}</option>
            <option value="maritime">{translations.maritime}</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="quantity"
            className="mb-2 block text-sm font-medium"
            style={{ color: "var(--color-text)" }}
          >
            {translations.quantity}
          </label>

          <input
            id="quantity"
            name="quantity"
            type="number"
            min="0"
            step="any"
            value={form.quantity}
            onChange={(event) => updateField("quantity", event.target.value)}
            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm outline-none transition focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/20"
          />
        </div>

        <div>
          <label
            htmlFor="weight"
            className="mb-2 block text-sm font-medium"
            style={{ color: "var(--color-text)" }}
          >
            {translations.weight}
          </label>

          <div className="flex gap-2">
            <input
              id="weight"
              name="weight"
              type="number"
              min="0"
              step="any"
              value={form.weight}
              onChange={(event) => updateField("weight", event.target.value)}
              className="min-w-0 flex-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm outline-none transition focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/20"
            />

            <select
              id="weightUnit"
              name="weightUnit"
              value={form.weightUnit}
              onChange={(event) =>
                updateField(
                  "weightUnit",
                  event.target.value as CalculatorFormState["weightUnit"]
                )
              }
              className="w-24 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-3 text-sm outline-none transition focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/20"
            >
              <option value="kg">{translations.weightUnitKg}</option>
              <option value="g">{translations.weightUnitG}</option>
              <option value="lb">{translations.weightUnitLb}</option>
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="cargoValue"
            className="mb-2 block text-sm font-medium"
            style={{ color: "var(--color-text)" }}
          >
            {translations.cargoValue}
          </label>

          <input
            id="cargoValue"
            name="cargoValue"
            type="number"
            min="0"
            step="any"
            value={form.cargoValue}
            onChange={(event) => updateField("cargoValue", event.target.value)}
            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm outline-none transition focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/20"
          />
        </div>

        {[
          ["freight", translations.freight],
          ["insurance", translations.insurance],
          ["customs", translations.customs],
          ["handling", translations.handling],
          ["localTransport", translations.localTransport],
          ["otherCosts", translations.otherCosts],
        ].map(([field, label]) => (
          <div key={field}>
            <label
              htmlFor={field}
              className="mb-2 block text-sm font-medium"
              style={{ color: "var(--color-text)" }}
            >
              {label}
            </label>

            <input
              id={field}
              name={field}
              type="number"
              min="0"
              step="any"
              value={form[field as keyof CalculatorFormState] as string}
              onChange={(event) =>
                updateField(
                  field as keyof CalculatorFormState,
                  event.target.value
                )
              }
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm outline-none transition focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/20"
            />
          </div>
        ))}
      </div>

      <div className="mt-8 border-t border-[var(--color-border)] pt-6">
        <button
          type="submit"
          className="w-full rounded-lg px-6 py-3 text-sm font-semibold transition-colors sm:w-auto"
          style={{
            background: "var(--brand-primary)",
            color: "var(--surface)",
          }}
        >
          {translations.submit}
        </button>
      </div>
    </form>
  );
}
