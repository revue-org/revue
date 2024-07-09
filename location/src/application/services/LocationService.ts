import { Location } from '@/domain/core/Location'
import { LocationId } from '@/domain/core/LocationId'

export interface LocationService {
  getLocationById(locationId: LocationId): Promise<Location>

  getBuildings(): Promise<Location[]>

  createBuilding(description: string, address: string, external: boolean): Promise<void>

  updateBuilding(id: LocationId, description: string, address: string, external: boolean): Promise<void>

  getBuildingRooms(buildingId: LocationId): Promise<Location[]>

  getRooms(): Promise<Location[]>

  createRoom(description: string, buildingId: LocationId): Promise<void>

  updateRoom(id: LocationId, description: string): Promise<void>

  getExternalRooms(): Promise<Location[]>

  getExternalBuildings(): Promise<Location[]>

  deleteLocation(locationId: LocationId): Promise<void>
}
