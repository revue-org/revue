import { Resolution } from '../../core/Resolution.js'
import { ResolutionImpl } from '../../core/impl/ResolutionImpl'
import { ResolutionFactory } from '../ResolutionFactory'

export class ResolutionFactoryImpl implements ResolutionFactory {
  createResolution(height: number, width: number): Resolution {
    return new ResolutionImpl(height, width)
  }
}
