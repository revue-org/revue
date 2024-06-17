import { Location } from '../core/Location'
import { LocationId } from '../core/LocationId'

export class LocationFactory {
  static newId(): LocationId {
    return { value: 'test' }
  }

  static idOf(id: string): LocationId {
    return { value: id }
  }

  static newRoom(description: string, buildingId: LocationId): Location {
    return {
      locationId: this.newId(),
      description,
      buildingId,
      isRoom: true
    }
  }

  static newBuilding(description: string, address: string, isExternal: boolean): Location {
    return {
      locationId: this.newId(),
      description,
      address,
      isExternal,
      isRoom: false
    }
  }
}
