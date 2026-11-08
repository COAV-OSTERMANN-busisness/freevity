import type {
    FreightCalculationInput,
  } from "@/types/calculation/freight/freightCalculationInput";
  
  import type {
    AirFreightResult,
  } from "@/types/calculation/freight/airFreight";
  
  import type {
    MaritimeFreightResult,
  } from "@/types/calculation/freight/maritimeFreight";
  
  import type {
    RoadFreightResult,
  } from "@/types/calculation/freight/roadFreight";
  
  import { calculateAirFreight } from "../air/calculateAirFreight";
  import { calculateMaritimeFreight } from "../maritime/calculateMaritimeFreight";
  import { calculateRoadFreight } from "../road/calculateRoadFreight";
  
  export type NationalFreightResult =
    | RoadFreightResult
    | AirFreightResult
    | MaritimeFreightResult;
  
  export function calculateNationalFreight(
    input: FreightCalculationInput,
  ): NationalFreightResult {
    if (input.scope !== "national") {
      throw new Error(
        "National freight calculation requires national scope.",
      );
    }
  
    if (
      input.route.originCountry !==
      input.route.destinationCountry
    ) {
      throw new Error(
        "National freight requires origin and destination in the same country.",
      );
    }
  
    switch (input.mode) {
      case "road":
        if (!input.road) {
          throw new Error(
            "Road freight input is required for road calculation.",
          );
        }
  
        return calculateRoadFreight(input.road);
  
      case "air":
        if (!input.air) {
          throw new Error(
            "Air freight input is required for air calculation.",
          );
        }
  
        return calculateAirFreight(input.air);
  
      case "maritime":
        if (!input.maritime) {
          throw new Error(
            "Maritime freight input is required for maritime calculation.",
          );
        }
  
        return calculateMaritimeFreight(
          input.maritime,
        );
  
      default: {
        const exhaustiveCheck: never = input.mode;
  
        throw new Error(
          `Unsupported national freight mode: ${exhaustiveCheck}`,
        );
      }
    }
  }