import { InvalidJsonRequest, readJsonObject } from "@/lib/security/readJsonObject";
import { NextResponse } from "next/server";

import { calculateRoadDistance } from "@/lib/external";

function isValidLocation(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export async function POST(request: Request) {
  try {
    const body = await readJsonObject(request);

    if (!isValidLocation(body.origin)) {
      return NextResponse.json(
        { error: "Origin is required." },
        { status: 400 }
      );
    }

    if (!isValidLocation(body.destination)) {
      return NextResponse.json(
        { error: "Destination is required." },
        { status: 400 }
      );
    }

    const result = await calculateRoadDistance(body.origin, body.destination);

    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof InvalidJsonRequest) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    console.error("Road distance calculation failed.");

    return NextResponse.json(
      { error: "Unable to calculate road distance." },
      { status: 500 }
    );
  }
}
