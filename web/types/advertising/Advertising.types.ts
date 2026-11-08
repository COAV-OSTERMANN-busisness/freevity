export type AdvertisingProvider = "google" | "frevity" | "custom";

export type AdvertisingFormat =
  | "banner"
  | "rectangle"
  | "native"
  | "responsive";

export interface AdvertisingProps {
  provider: AdvertisingProvider;
  format: AdvertisingFormat;
  imageUrl?: string;
  targetUrl?: string;
  slot?: string;
  campaignId?: string;
  className?: string;
}