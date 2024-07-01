import {
  BuildingInsertion,
  BuildingUpdate,
  RoomInsertion,
  RoomUpdate
} from '@/presentation/api/schemas/LocationSchemas'
import { Location } from '@/domain/core/Location'

export interface LocationPresenter {
  parse(obj: object): Location

  parseBuildingInsertion(obj: object): BuildingInsertion

  parseBuildingUpdate(obj: object): BuildingUpdate

  parseRoomInsertion(obj: object): RoomInsertion

  parseRoomUpdate(obj: object): RoomUpdate
}
