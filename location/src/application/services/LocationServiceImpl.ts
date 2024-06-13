import { Location } from '../../domain/core/Location'
import { LocationId } from '../../domain/core/LocationId'
import { LocationFactory } from '../../domain/factories/LocationFactory'
import { LocationRepository } from '../repositories/LocationRepository'
import { LocationService } from './LocationService'

export class LocationServiceImpl implements LocationService {
  private _repository: LocationRepository

  constructor(locationRepository: LocationRepository) {
    this._repository = locationRepository
  }
  async createRoom(description: string, buildingId: LocationId): Promise<void> {
    return await this._repository.saveLocation(LocationFactory.newRoom(description, buildingId))
  }
  async createBuilding(description: string, address: string, external: boolean): Promise<void> {
    return await this._repository.saveLocation(LocationFactory.newBuilding(description, address, external))
  }
  async getLocationById(locationId: LocationId): Promise<Location> {
    return await this._repository.getLocationById(locationId)
  }
  async getBuildings(): Promise<Location[]> {
    return await this._repository.getBuildings()
  }
  async getExternalBuildings(): Promise<Location[]> {
    return await this._repository.getExernalBuildings()
  }
  async getBuildingRooms(buildingId: LocationId): Promise<Location[]> {
    throw await this._repository.getBuildingRooms(buildingId)
  }
  async getRooms(): Promise<Location[]> {
    throw await this._repository.getRooms()
  }
  async getExternalRooms(): Promise<Location[]> {
    throw await this._repository.getExternalRooms()
  }
  async updateLocation(location: Location): Promise<void> {
    throw await this._repository.updateLocation(location)
  }
  async deleteLocation(locationId: LocationId): Promise<void> {
    throw await this._repository.deleteLocation(locationId)
  }
}
