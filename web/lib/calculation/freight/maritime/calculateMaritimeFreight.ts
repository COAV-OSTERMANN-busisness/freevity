import type {
    MaritimeFreightInput,
    MaritimeFreightResult,
  } from "@/types/calculation/freight/maritimeFreight";
  
  import { calculateMaritimeFcl } from "./calculateMaritimeFcl";
  import { calculateMaritimeLcl } from "./calculateMaritimeLcl";
  
  export function calculateMaritimeFreight(
    input: MaritimeFreightInput,
  ): MaritimeFreightResult {
    switch (input.type) {
      case "fcl":
        if (!input.fcl) {
          throw new Error(
            "FCL freight input is required for FCL calculation.",
          );
        }
  
        return calculateMaritimeFcl(input.fcl);
  
      case "lcl":
        if (!input.lcl) {
          throw new Error(
            "LCL freight input is required for LCL calculation.",
          );
        }
  
        return calculateMaritimeLcl(input.lcl);
  
      default: {
        const exhaustiveCheck: never = input.type;
  
        throw new Error(
          `Unsupported maritime freight type: ${exhaustiveCheck}`,
        );
      }
    }
  }