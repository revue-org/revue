import { LocationService } from '@/application/services/LocationService'
import { LocationServiceImpl } from '@/application/services/LocationServiceImpl.js'
import { MongoDBLocationRepository } from '@/infrastructure/storage/MongoDBLocationRepository.js'
import { Location } from '@/domain/core/Location'
import { LocationFactory } from '@/domain/factories/LocationFactory.js'

const service: LocationService = new LocationServiceImpl(new MongoDBLocationRepository())

export const locationsController = {
  getLocationById(id: string): Promise<Location> {
    return service.getLocationById(LocationFactory.idOf(id))
  },
  getRooms(): Promise<Location[]> {
    return service.getRooms()
  },
  createRoom(description: string, buildingId: string): Promise<void> {
    return service.createRoom(description, LocationFactory.idOf(buildingId))
  },
  updateRoom(id: string, description: string): Promise<void> {
    return service.updateRoom(LocationFactory.idOf(id), description)
  },
  getBuildings(): Promise<Location[]> {
    return service.getBuildings()
  },
  createBuilding(description: string, address: string, external: boolean): Promise<void> {
    return service.createBuilding(description, address, external)
  },
  updateBuilding(id: string, description: string, address: string, external: boolean): Promise<void> {
    return service.updateBuilding(LocationFactory.idOf(id), description, address, external)
  },
  deleteLocation(id: string): Promise<void> {
    return service.deleteLocation(LocationFactory.idOf(id))
  },
  getBuildingRooms(buildingId: string): Promise<Location[]> {
    return service.getBuildingRooms(LocationFactory.idOf(buildingId))
  }
}
