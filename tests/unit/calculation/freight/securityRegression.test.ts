import { describe, expect, it } from "vitest";
import { calculateRoadFreight } from "../../../../web/lib/calculation/freight/road/calculateRoadFreight";
import { calculateAirFreight } from "../../../../web/lib/calculation/freight/air/calculateAirFreight";
import { calculateMaritimeLcl } from "../../../../web/lib/calculation/freight/maritime/calculateMaritimeLcl";
import { calculateMaritimeFcl } from "../../../../web/lib/calculation/freight/maritime/calculateMaritimeFcl";
import type { FreightTariffBasis } from "../../../../web/types/calculation/freight/freightTariff";
const tariff=(basis:FreightTariffBasis,amount:number)=>({basis,rate:{amount,currency:"BRL"}});
describe("Freight behavior retained during security review",()=>{
  it.each([
    ["weight",1000,2,2,2,2000],
    ["volume",500,3,3,100,300],
    ["unit",800,4,4,250,1000],
    ["flat",3000,10,10,750,750],
    ["chargeableWeight",30,0.192,2,2.5,144],
  ] as const)("road %s",(basis,actualWeight,volume,quantity,rate,expected)=>{
    expect(calculateRoadFreight({actualWeight,volume,quantity,tariff:tariff(basis,rate)}).baseFreight.amount).toBeCloseTo(expected);
  });
  it.each([[100,200,1000],[300,200,1500]])("air chargeable weight %s",(actualWeight,volumetricWeight,expected)=>{
    expect(calculateAirFreight({actualWeight,volumetricWeight,volume:1.2,quantity:2,tariff:tariff("chargeableWeight",5)}).baseFreight.amount).toBe(expected);
  });
  it.each([[1000,2,200],[3000,2,300]])("LCL revenue ton %s",(actualWeight,volume,expected)=>{
    expect(calculateMaritimeLcl({actualWeight,volume,tariff:tariff("chargeableWeight",100)}).baseFreight.amount).toBe(expected);
  });
  it.each([["unit",5000],["flat",2500]] as const)("FCL %s",(basis,expected)=>{
    expect(calculateMaritimeFcl({containerQuantity:2,tariff:tariff(basis,2500)}).baseFreight.amount).toBe(expected);
  });
});
