import type { FreightResult } from "@/types/calculation/freight/freightResult";

export const mockFreightResult: FreightResult = {
  scope: "national",
  mode: "road",
  currency: "BRL",

  baseFreight: {
    amount: 485,
    currency: "BRL",
  },

  additionalCharges: [
    {
      id: "toll",
      label: "Pedágio",
      amount: {
        amount: 65,
        currency: "BRL",
      },
    },
    {
      id: "collection",
      label: "Coleta",
      amount: {
        amount: 80,
        currency: "BRL",
      },
    },
  ],

  totalFreight: {
    amount: 630,
    currency: "BRL",
  },

  actualWeight: 250,
  volumetricWeight: 288,
  chargeableWeight: 288,
  volume: 1.44,

  tariffBasis: "weight",
};