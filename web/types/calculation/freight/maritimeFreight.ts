import type {
    FreightMoney,
    FreightTariff,
  } from "./freightTariff";
  
  export type MaritimeFreightType = "fcl" | "lcl";
  
  export interface MaritimeFclInput {
    tariff: FreightTariff;
    containerQuantity: number;
  }
  
  export interface MaritimeLclInput {
    actualWeight: number;
    volume: number;
    tariff: FreightTariff;
  }
  
  export interface MaritimeFreightInput {
    type: MaritimeFreightType;
    fcl?: MaritimeFclInput;
    lcl?: MaritimeLclInput;
  }
  
  export interface MaritimeFreightResult {
    type: MaritimeFreightType;
    baseFreight: FreightMoney;
  }