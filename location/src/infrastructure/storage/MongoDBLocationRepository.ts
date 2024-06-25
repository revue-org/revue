import mongoose from 'mongoose'
import { locationSchema } from './schemas/LocationSchema'
import { LocationDBAdapter, LocationDBEntity } from './models/LocationModel'
import { LocationRepository } from '@/application/repositories/LocationRepository'
import { Location } from '@/domain/core/Location'
import { LocationId } from '@/domain/core/LocationId'

export class MongoDBLocationRepository implements LocationRepository {
  private model = mongoose.model<LocationDBEntity>('Location', locationSchema)

  async saveLocation(location: Location): Promise<void> {
    await this.model.create(LocationDBAdapter.asDBEntity(location))
  }

  async removeLocation(location: LocationId): Promise<void> {
    await this.model.deleteOne({ id: location.value })
  }

  async updateLocation(location: Location): Promise<void> {
    await this.model.updateOne({ id: location.locationId.value }, LocationDBAdapter.asDBEntity(location))
  }

  getLocationById(locationId: LocationId): Promise<Location> {
    return this.model
      .findOne({ locationId: locationId.value })
      .lean()
      .then(location => LocationDBAdapter.asDomainEntity(location as LocationDBEntity))
  }

  getBuildings(): Promise<Location[]> {
    return this.model
      .find({ isRoom: false })
      .lean()
      .then(locations => locations.map(location => LocationDBAdapter.asDomainEntity(location)))
  }

  getExternalBuildings(): Promise<Location[]> {
    return this.model
      .find({ isRoom: false, external: true })
      .lean()
      .then(locations => locations.map(location => LocationDBAdapter.asDomainEntity(location)))
  }

  getBuildingRooms(buildingId: LocationId): Promise<Location[]> {
    return this.model
      .find({ buildingId: buildingId.value, isRoom: true })
      .lean()
      .then(locations => locations.map(location => LocationDBAdapter.asDomainEntity(location)))
  }

  getRooms(): Promise<Location[]> {
    return this.model
      .find({ isRoom: true })
      .lean()
      .then(locations => locations.map(location => LocationDBAdapter.asDomainEntity(location)))
  }

  getExternalRooms(): Promise<Location[]> {
    return this.model
      .find({ isRoom: true, external: true })
      .lean()
      .then(locations => locations.map(location => LocationDBAdapter.asDomainEntity(location)))
  }
}
