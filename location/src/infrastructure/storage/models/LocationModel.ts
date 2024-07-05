import { Location } from '@/domain/core/Location'
import { LocationFactory } from '@/domain/factories/LocationFactory.js'

export interface LocationDBEntity {
  id: string
  description: string
  address?: string
  external?: boolean
  isRoom?: boolean
  buildingId?: string
}

export class LocationDBAdapter {
  static asDomainEntity(location: LocationDBEntity): Location {
    if (location.isRoom) {
      return LocationFactory.roomFrom(
        LocationFactory.idOf(location.id),
        location.description,
        LocationFactory.idOf(location.buildingId!)
      )
    }
    return LocationFactory.buildingFrom(
      LocationFactory.idOf(location.id),
      location.description,
      location.address!,
      location.external!
    )
  }

  static asDBEntity(location: Location): LocationDBEntity {
    return {
      id: location.id.value,
      description: location.description,
      address: location.address,
      external: location.isExternal,
      isRoom: location.isRoom,
      buildingId: location.buildingId?.value
    }
  }
}
