
"use client";

import { useState } from "react";
import type { KeyboardEvent } from "react";

interface AdditionalFreightFieldFormProps {
  fieldLabel: string;
  fieldPlaceholder: string;
  addLabel: string;
  onAdd: (label: string) => void;
}

export function AdditionalFreightFieldForm({
  fieldLabel,
  fieldPlaceholder,
  addLabel,
  onAdd,
}: AdditionalFreightFieldFormProps) {
  const [label, setLabel] = useState("");

  function handleAdd(): void {
    const normalizedLabel = label.trim();

    if (!normalizedLabel) {
      return;
    }

    onAdd(normalizedLabel);
    setLabel("");
  }

  function handleKeyDown(
    event: KeyboardEvent<HTMLInputElement>
  ): void {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAdd();
    }
  }

  return (
    <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
      <label className="block">
        <span
          className="mb-2 block text-sm font-medium"
          style={{ color: "var(--color-text)" }}
        >
          {fieldLabel}
        </span>

        <input
          type="text"
          value={label}
          onChange={(event) => setLabel(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={fieldPlaceholder}
          className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3 text-sm outline-none transition"
          style={{ color: "var(--color-text)" }}
        />
      </label>

      <button
        type="button"
        onClick={handleAdd}
        disabled={!label.trim()}
        className="min-h-11 rounded-xl px-5 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50"
        style={{
          backgroundColor: "var(--brand-primary)",
          color: "#ffffff",
        }}
      >
        {addLabel}
      </button>
    </div>
  );
}