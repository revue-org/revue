import { Resolution } from '../core/Resolution.js'

export interface ResolutionFactory {
  createResolution(width: number, height: number): Resolution
}
