import { DeviceId } from "../DeviceId.js";
import { DeviceType } from "./enum/DeviceType.js";


export class DeviceIdImpl implements DeviceId {
  private _type: DeviceType
  private _code: string

  constructor(type: DeviceType, code: string) {
    this._type = type
    this._code = code
  }

  get type(): DeviceType {
    return this._type
  }

  set type(type: DeviceType) {
    this._type = type
  }

  get code(): string {
    return this._code
  }

  set code(code: string) {
    this._code = code
  }
}