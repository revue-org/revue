import { LocationId } from "./LocationId"

export interface Location {

    readonly locationId: LocationId

    readonly description: string

    readonly buildingId?: LocationId

    readonly address?: string

    readonly isExternal?: boolean

    readonly isRoom: boolean
}
