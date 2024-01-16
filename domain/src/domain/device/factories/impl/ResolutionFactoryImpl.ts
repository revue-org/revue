import { Resolution } from '../../core/Resolution.js'
import { ResolutionImpl } from '../../core/impl/ResolutionImpl.js'
import { ResolutionFactory } from '../ResolutionFactory.js'

export class ResolutionFactoryImpl implements ResolutionFactory {
  createResolution(height: number, width: number): Resolution {
    return new ResolutionImpl(height, width)
  }
}
