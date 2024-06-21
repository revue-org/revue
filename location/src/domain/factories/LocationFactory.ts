import { Location } from '../core/Location'
import { LocationId } from '../core/LocationId'

export class LocationFactory {
  static newId(): LocationId {
    return { value: 'test' }
  }

  static idOf(id: string): LocationId {
    return { value: id }
  }

  static roomFrom(id: LocationId, description: string, buildingId: LocationId): Location {
    return {
      locationId: id,
      description,
      buildingId,
      isRoom: true
    }
  }

  static createRoom(description: string, buildingId: LocationId): Location {
    return this.roomFrom(this.newId(), description, buildingId)
  }

  static buildingFrom(id: LocationId, description: string, address: string, isExternal: boolean): Location {
    return {
      locationId: id,
      description,
      address,
      isExternal,
      isRoom: false
    }
  }

  static createBuilding(description: string, address: string, isExternal: boolean): Location {
    return this.buildingFrom(this.newId(), description, address, isExternal)
  }
}
