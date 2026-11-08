import { InvalidJsonRequest, readJsonObject } from "@/lib/security/readJsonObject";
import { NextResponse } from "next/server";
import { geocodeLocation } from "@/lib/external";

function isValidLocation(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export async function POST(request: Request) {
  try {
    const body = await readJsonObject(request);

    if (!isValidLocation(body.location)) {
      return NextResponse.json(
        { error: "Location is required." },
        { status: 400 }
      );
    }

    const result = await geocodeLocation(body.location);

    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof InvalidJsonRequest) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    console.error("Geocoding failed.");

    return NextResponse.json(
      { error: "Unable to geocode location." },
      { status: 500 }
    );
  }
}
