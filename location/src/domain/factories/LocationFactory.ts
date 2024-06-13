import { Location } from '../core/Location'
import { LocationId } from '../core/LocationId'

export class LocationFactory {
  static newLocationId(): LocationId {
    return { value: 'id' }
  }

  static idOf(id: string): LocationId {
    return { value: id }
  }

  static newRoom(description: string, buildingId: LocationId): Location {
    return {
      locationId: this.newLocationId(),
      description,
      buildingId,
      isRoom: true
    }
  }

  static newBuilding(description: string, address: string, isExternal: boolean): Location {
    return {
      locationId: this.newLocationId(),
      description,
      address,
      isExternal,
      isRoom: false
    }
  }
}
