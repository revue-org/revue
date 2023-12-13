import { Resolution } from "../core/Resolution";

export interface ResolutionFactory {
  createResolution(height: number, width: number): Resolution
}