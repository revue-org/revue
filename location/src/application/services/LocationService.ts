import { LocationId } from "../../domain/core/LocationId";
import { Location } from "../../domain/core/Location";

export interface LocationService {

    createRoom(description: string, buildingId: LocationId): Promise<void>

    createBuilding(description: string, address: string, external: boolean): Promise<void>

    getLocationById(locationId: LocationId): Promise<Location>

    getBuildings(): Promise<Location[]>

    getExternalBuildings(): Promise<Location[]>

    getBuildingRooms(buildingId: LocationId): Promise<Location[]>

    getRooms(): Promise<Location[]>

    getExternalRooms(): Promise<Location[]>

    updateLocation(location: Location): Promise<void>

    deleteLocation(locationId: LocationId): Promise<void>
}
