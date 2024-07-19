import { Location } from '../core/Location'
import { LocationId } from '../core/LocationId'
import { v4 as uuidv4 } from 'uuid'

export class LocationFactory {
  static newId(): LocationId {
    return { value: uuidv4() }
  }

  static idOf(id: string): LocationId {
    return { value: id }
  }

  static roomFrom(id: LocationId, description: string, buildingId: LocationId): Location {
    return {
      id: id,
      description,
      buildingId,
      isRoom: true
    }
  }

  static createRoom(description: string, buildingId: LocationId): Location {
    return this.roomFrom(this.newId(), description, buildingId)
  }

  static buildingFrom(id: LocationId, description: string, address: string, external: boolean): Location {
    return {
      id: id,
      description,
      address,
      external: external,
      isRoom: false
    }
  }

  static createBuilding(description: string, address: string, external: boolean): Location {
    return this.buildingFrom(this.newId(), description, address, external)
  }
}
