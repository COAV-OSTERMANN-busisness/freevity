import type { AdditionalFreightCharge } from "./additionalFreightCharge";
import type { AirFreightInput } from "./airFreight";
import type { MaritimeFreightInput } from "./maritimeFreight";
import type { RoadFreightInput } from "./roadFreight";

export type FreightTransportMode =
  | "road"
  | "air"
  | "maritime";

export type FreightTransportScope =
  | "national"
  | "international";

export interface FreightRoute {
  originCountry: string;
  destinationCountry: string;
}

export interface FreightCalculationInput {
  scope: FreightTransportScope;
  mode: FreightTransportMode;
  route: FreightRoute;

  road?: RoadFreightInput;
  air?: AirFreightInput;
  maritime?: MaritimeFreightInput;

  additionalCharges?: AdditionalFreightCharge[];
}