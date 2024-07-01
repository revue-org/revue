import { LocationPresenter } from '@/presentation/api/LocationPresenter.js'
import { z, ZodType } from 'zod'
import { Location } from '@/domain/core/Location'
import { BuildingInsertion, RoomInsertion, RoomUpdate } from '../schemas/LocationSchemas'

export class ZodLocationPresenter implements LocationPresenter {
  private readonly locationSchema: ZodType<Location>
  private readonly buildingSchema
  private readonly roomUpdateSchema
  private readonly roomInsertionSchema


  constructor() {
    this.buildingSchema = z.object({
      description: z.string(),
      address: z.string(),
      external: z.boolean()
    })
    this.locationSchema = this.buildingSchema.extend({
      locationId: z.object({
        value: z.string()
      }),
      buildingId: z.object({
        value: z.string()
      }),
      isRoom: z.boolean()
    })
    this.roomUpdateSchema = z.object({
      description: z.string()
    })
    this.roomInsertionSchema = this.roomUpdateSchema.extend({
      buildingId: z.string()
    })
  }

  parse(obj: object): Location {
    return this.locationSchema.parse(obj)
  }

  parseBuildingInsertion(obj: object): BuildingInsertion {
    return this.buildingSchema.parse(obj)
  }

  parseBuildingUpdate(obj: object): BuildingInsertion {
    return this.buildingSchema.parse(obj)
  }

  parseRoomInsertion(obj: object): RoomInsertion {
    return this.roomInsertionSchema.parse(obj)
  }

  parseRoomUpdate(obj: object): RoomUpdate {
    return this.roomUpdateSchema.parse(obj)
  }
}
