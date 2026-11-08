import { afterEach, describe, expect, it, vi } from "vitest";
import { readJsonObject } from "../../../web/lib/security/readJsonObject";
import { POST as geocode } from "../../../web/app/api/geocode/route";
import { POST as distance } from "../../../web/app/api/road-distance/route";
function request(body: string, headers: Record<string,string> = {}) {
  return new Request("https://example.test/api",{method:"POST",body,headers:{"Content-Type":"application/json",...headers}});
}
afterEach(()=>{vi.unstubAllGlobals();vi.unstubAllEnvs();vi.restoreAllMocks();});
describe("JSON request security",()=>{
  it.each(["null","[]",'"text"',"false","1","{",""])("rejects invalid JSON object %s",async body=>{
    await expect(readJsonObject(request(body))).rejects.toMatchObject({status:400});
  });
  it("preserves valid Unicode and unrelated properties",async()=>{
    const data={location:"東京都、日本",other:"unchanged"};
    await expect(readJsonObject(request(JSON.stringify(data)))).resolves.toEqual(data);
  });
  it("does not introduce a content-type requirement absent from the original API",async()=>{
    await expect(readJsonObject(request('{"location":"Salvador"}',{"Content-Type":"text/plain"}))).resolves.toEqual({location:"Salvador"});
  });
  it("checks actual bytes instead of trusting Content-Length",async()=>{
    await expect(readJsonObject(request(JSON.stringify({location:"a".repeat(8192)}),{"Content-Length":"2"}))).rejects.toMatchObject({status:413});
  });
  it("cancels oversized streaming requests",async()=>{
    let cancelled=false;
    const stream=new ReadableStream({pull(controller){controller.enqueue(new Uint8Array(4096));},cancel(){cancelled=true;}});
    const req=new Request("https://example.test",{method:"POST",body:stream,duplex:"half"} as RequestInit);
    await expect(readJsonObject(req)).rejects.toMatchObject({status:413});
    expect(cancelled).toBe(true);
  });
});
describe("API boundaries",()=>{
  it.each([geocode,distance])("rejects null without contacting Google",async handler=>{
    const fetch=vi.fn();vi.stubGlobal("fetch",fetch);
    expect((await handler(request("null"))).status).toBe(400);
    expect(fetch).not.toHaveBeenCalled();
  });
  it.each([geocode,distance])("rejects malformed JSON without contacting Google",async handler=>{
    const fetch=vi.fn();vi.stubGlobal("fetch",fetch);
    expect((await handler(request("{"))).status).toBe(400);
    expect(fetch).not.toHaveBeenCalled();
  });
  it.each([geocode,distance])("rejects oversized bodies without contacting Google",async handler=>{
    const fetch=vi.fn();vi.stubGlobal("fetch",fetch);
    expect((await handler(request(JSON.stringify({location:"a".repeat(9000)})))).status).toBe(413);
    expect(fetch).not.toHaveBeenCalled();
  });
  it("keeps the provider failure response but does not log provider contents",async()=>{
    vi.stubEnv("GOOGLE_MAPS_API_KEY","test-only-not-a-real-key");
    vi.stubGlobal("fetch",vi.fn().mockRejectedValue(new Error("test-private-provider-detail")));
    const log=vi.spyOn(console,"error").mockImplementation(()=>{});
    const response=await distance(request(JSON.stringify({origin:"Salvador",destination:"Feira de Santana"})));
    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({error:"Unable to calculate road distance."});
    expect(log).toHaveBeenCalledWith("Road distance calculation failed.");
    expect(JSON.stringify(log.mock.calls)).not.toContain("test-private-provider-detail");
  });
  it("keeps the original missing-key response rather than introducing a new configuration flow",async()=>{
    vi.stubEnv("GOOGLE_MAPS_API_KEY","");
    vi.spyOn(console,"error").mockImplementation(()=>{});
    const response=await geocode(request('{"location":"Salvador"}'));
    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({error:"Unable to geocode location."});
  });
});
