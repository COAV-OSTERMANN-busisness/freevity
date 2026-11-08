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
  
  export type InternationalFreightResult =
    | RoadFreightResult
    | AirFreightResult
    | MaritimeFreightResult;
  
  export function calculateInternationalFreight(
    input: FreightCalculationInput,
  ): InternationalFreightResult {
    if (input.scope !== "international") {
      throw new Error(
        "International freight calculation requires international scope.",
      );
    }
  
    if (
      input.route.originCountry ===
      input.route.destinationCountry
    ) {
      throw new Error(
        "International freight requires different origin and destination countries.",
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
          `Unsupported international freight mode: ${exhaustiveCheck}`,
        );
      }
    }
  }