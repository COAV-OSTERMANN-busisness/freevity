import type { CurrencyCode, LocalTransport, Money } from "@/types/calculation/landedCost";

export function calculateLocalTransport(
  localTransport: LocalTransport,
  currency: CurrencyCode,
): Money {
  if (!localTransport.required) {
    return {
      amount: 0,
      currency,
    };
  }

  const charges = localTransport.charges ?? [];

  for (const charge of charges) {
    if (charge.amount) {
      if (!Number.isFinite(charge.amount.amount)) {
        throw new Error(
          "Local transport charge amounts must be finite numbers.",
        );
      }

      if (charge.amount.currency !== currency) {
        throw new Error(
          "Local transport charges must use the calculation currency.",
        );
      }
    }
  }

  const amount = charges.reduce(
    (total, charge) => total + (charge.amount?.amount ?? 0),
    0,
  );

  if (!Number.isFinite(amount)) {
    throw new Error(
      "Calculated local transport amount must be a finite number.",
    );
  }

  return {
    amount,
    currency,
  };
}
