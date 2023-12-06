import { Resolution } from '../Resolution'

export class ResolutionImpl implements Resolution {
  private _height: number
  private _width: number

  constructor(height: number, width: number) {
    this._height = height
    this._width = width
  }

  get height(): number {
    return this._height
  }

  set height(height: number) {
    this._height = height
  }

  get width(): number {
    return this._width
  }

  set width(width: number) {
    this._width = width
  }
}
