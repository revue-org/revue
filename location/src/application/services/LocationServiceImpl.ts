import { LocationId } from '@/domain/core/LocationId'
import { LocationRepository } from '../repositories/LocationRepository'
import { LocationService } from './LocationService'
import { LocationFactory } from '@/domain/factories/LocationFactory'
import { Location } from '@/domain/core/Location'

export class LocationServiceImpl implements LocationService {
  private _repository: LocationRepository

  constructor(locationRepository: LocationRepository) {
    this._repository = locationRepository
  }

  async createRoom(description: string, buildingId: LocationId): Promise<void> {
    return this._repository.saveLocation(LocationFactory.createRoom(description, buildingId))
  }

  async createBuilding(description: string, address: string, external: boolean): Promise<void> {
    return this._repository.saveLocation(LocationFactory.createBuilding(description, address, external))
  }

  async getLocationById(locationId: LocationId): Promise<Location> {
    return this._repository.getLocationById(locationId)
  }

  async getBuildings(): Promise<Location[]> {
    return this._repository.getBuildings()
  }

  async getExternalBuildings(): Promise<Location[]> {
    return this._repository.getExternalBuildings()
  }

  async getBuildingRooms(buildingId: LocationId): Promise<Location[]> {
    return this._repository.getBuildingRooms(buildingId)
  }

  async getRooms(): Promise<Location[]> {
    return this._repository.getRooms()
  }

  async getExternalRooms(): Promise<Location[]> {
    return this._repository.getExternalRooms()
  }

  private async updateLocation(location: Location): Promise<void> {
    return this._repository.updateLocation(location)
  }

  async deleteLocation(locationId: LocationId): Promise<void> {
    return this._repository.removeLocation(locationId)
  }

  updateRoom(id: LocationId, description: string): Promise<void> {
    return this.getLocationById(id).then((location: Location) => {
      return this.updateLocation({ ...location, description })
    })
  }
  updateBuilding(id: LocationId, description: string, address: string, external: boolean): Promise<void> {
    return this.getLocationById(id).then((location: Location) => {
      return this.updateLocation({ ...location, description, address, isExternal: external })
    })
  }
}
