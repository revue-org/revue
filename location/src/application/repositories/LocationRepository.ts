import { Location } from '@/domain/core/Location'
import { LocationId } from '@/domain/core/LocationId'

export interface LocationRepository {
  saveLocation(location: Location): Promise<void>

  deleteLocation(location: LocationId): Promise<void>

  updateLocation(location: Location): Promise<void>

  getLocationById(locationId: LocationId): Promise<Location>

  getBuildings(): Promise<Location[]>

  getExernalBuildings(): Promise<Location[]>

  getBuildingRooms(buildingId: LocationId): Promise<Location[]>

  getRooms(): Promise<Location[]>

  getExternalRooms(): Promise<Location[]>
}
