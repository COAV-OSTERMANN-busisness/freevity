export interface VolumetricWeightInput {
  length: number;
  width: number;
  height: number;
  divisor: number;
}

export interface VolumetricWeightResult {
  value: number;
  divisor: number;
}
