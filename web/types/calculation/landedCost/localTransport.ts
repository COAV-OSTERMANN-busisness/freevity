import type { Money } from "./cargo";
import type { TransportLocation, TransportMode } from "./transport";

/**
 * Local transport stage.
 */
export type LocalTransportStage =
  | "origin"
  | "destination";

/**
 * Local transportation charge.
 */
export interface LocalTransportCharge {
  /**
   * Transportation mode used for the local leg.
   *
   * Road is the most common case, but the model remains
   * extensible without forcing a single implementation.
   */
  mode: TransportMode;

  /**
   * Origin of the local leg.
   */
  origin?: TransportLocation;

  /**
   * Destination of the local leg.
   */
  destination?: TransportLocation;

  /**
   * Distance for the local leg.
   */
  distanceKm?: number;

  /**
   * Charge for the local transportation leg.
   */
  amount?: Money;

  /**
   * Optional carrier/service reference.
   */
  reference?: string;

  /**
   * Optional operational description.
   */
  description?: string;
}

/**
 * Local transportation information.
 */
export interface LocalTransport {
  /**
   * Indicates whether local transportation is involved.
   */
  required: boolean;

  /**
   * Origin or destination stage.
   */
  stage?: LocalTransportStage;

  /**
   * Local transportation charges.
   */
  charges?: LocalTransportCharge[];

  /**
   * Optional general notes.
   */
  notes?: string;
}