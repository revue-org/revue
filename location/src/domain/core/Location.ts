import { LocationId } from './LocationId'

export interface Location {
  readonly id: LocationId

  readonly description: string

  readonly buildingId?: LocationId

  readonly address?: string

  readonly isExternal?: boolean

  readonly isRoom: boolean
}
