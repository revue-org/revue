export type RoomInsertion = {
  description: string
  buildingId: string
}

export type RoomUpdate = {
  description: string
}

export type BuildingInsertion = {
  description: string
  address: string
  external: boolean
}

export type BuildingUpdate = BuildingInsertion
