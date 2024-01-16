import { Resolution } from '../core/Resolution.js'

export interface ResolutionFactory {
  createResolution(height: number, width: number): Resolution
}
