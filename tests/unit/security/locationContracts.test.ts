import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST as geocode } from "../../../web/app/api/geocode/route";
import { POST as distance } from "../../../web/app/api/road-distance/route";
const fetchMock = vi.fn();
function request(body: unknown) {
  return new Request("https://example.test/api", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
}
beforeEach(() => {
  fetchMock.mockReset();
  vi.stubGlobal("fetch", fetchMock);
  vi.stubEnv("GOOGLE_MAPS_API_KEY", "test-only-not-a-real-key");
  fetchMock.mockImplementation(async (url: string) => new Response(JSON.stringify(
    url.includes("routes.googleapis.com") ? { routes: [{ distanceMeters: 115000 }] } :
    { results: [{ location: {latitude:-12.97,longitude:-38.5}, addressComponents: [{ types: ["country"], shortText: "BR" }] }] }
  ), { status: 200 }));
});
afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs(); });
describe("Existing successful Google integration contracts", () => {
  it("keeps geocoding response and normalization", async () => {
    const response = await geocode(request({ location: " Salvador " }));
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({latitude:-12.97,longitude:-38.5,countryCode:"BR"});
    expect(fetchMock.mock.calls[0][0]).toMatch(/\/Salvador$/);
    expect(fetchMock.mock.calls[0][1].headers["X-Goog-Api-Key"]).toBe("test-only-not-a-real-key");
  });
  it("keeps geocoding plus Routes and returns the same distance contract", async () => {
    const response = await distance(request({ origin: " Salvador ", destination: " Feira de Santana " }));
    expect(response.status).toBe(200);
    const point={latitude:-12.97,longitude:-38.5,countryCode:"BR"};
    expect(await response.json()).toEqual({distanceKm:115,origin:point,destination:point});
    expect(fetchMock).toHaveBeenCalledTimes(3);
    const call=fetchMock.mock.calls.find(([url])=>url.includes("routes.googleapis.com"));
    expect(JSON.parse(call![1].body)).toMatchObject({travelMode:"DRIVE",units:"METRIC"});
  });
});
