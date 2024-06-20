import { Location } from '@/domain/core/Location'
import { LocationFactory } from '@/domain/factories/LocationFactory'

export interface LocationDBEntity {
  description: string
  address?: string
  external?: boolean
  isRoom?: boolean
  buildingId?: string
}

export class LocationDBAdapter {
  static asDomainEntity(location: LocationDBEntity): Location {
    if (location.isRoom) {
      return LocationFactory.newRoom(location.description, LocationFactory.idOf(location.buildingId!))
    }
    return LocationFactory.newBuilding(location.description, location.address!, location.external!)
  }

  static asDBEntity(location: Location): LocationDBEntity {
    return {
      description: location.description,
      address: location.address,
      external: location.isExternal,
      isRoom: location.isRoom,
      buildingId: location.buildingId?.value
    }
  }
}
