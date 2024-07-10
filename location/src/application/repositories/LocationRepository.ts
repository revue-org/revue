import { Location } from '@/domain/core/Location'
import { LocationId } from '@/domain/core/LocationId'

export interface LocationRepository {
  getBuildings(): Promise<Location[]>

  getExternalBuildings(): Promise<Location[]>

  getBuildingRooms(buildingId: LocationId): Promise<Location[]>

  getRooms(): Promise<Location[]>

  getExternalRooms(): Promise<Location[]>

  getLocationById(locationId: LocationId): Promise<Location>

  saveLocation(location: Location): Promise<void>

  updateLocation(location: Location): Promise<void>

  removeLocation(location: LocationId): Promise<void>
}
