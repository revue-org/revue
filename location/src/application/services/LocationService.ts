import { Location } from '@/domain/core/Location'
import { LocationId } from '@/domain/core/LocationId'

export interface LocationService {
  getBuildings(): Promise<Location[]>

  getExternalBuildings(): Promise<Location[]>

  getBuildingRooms(buildingId: LocationId): Promise<Location[]>

  getRooms(): Promise<Location[]>

  getExternalRooms(): Promise<Location[]>

  getLocationById(locationId: LocationId): Promise<Location>

  createRoom(description: string, buildingId: LocationId): Promise<void>

  createBuilding(description: string, address: string, external: boolean): Promise<void>

  updateLocation(location: Location): Promise<void>

  deleteLocation(locationId: LocationId): Promise<void>
}
