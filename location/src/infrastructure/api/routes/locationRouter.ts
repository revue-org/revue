import express, { Router, Request, Response } from 'express'
import HttpStatusCode from '@common/utils/HttpStatusCode.js'
import { locationsController } from '../controllers/locationController.js'
import { LocationPresenter } from '@/presentation/api/LocationPresenter'
import { ZodLocationPresenter } from '@/presentation/api/impl/ZodLocationPresenter.js'
import { BuildingInsertion, RoomInsertion, RoomUpdate } from '@/presentation/api/schemas/LocationSchemas'
import { Location } from '@/domain/core/Location'

export const router: Router = express.Router()
const locationPresenter: LocationPresenter = new ZodLocationPresenter()


router
  .route('/:id')
  .get(async (req: Request, res: Response) => {
    try {
      const location: Location = await locationsController.getLocationById(req.params.id)
      locationPresenter.parse(location)
      res.status(HttpStatusCode.OK).json(location)
    } catch (e) {
      res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'error' })
    }
  })
  .delete(async (req: Request, res: Response) => {
    try {
      await locationsController.deleteLocation(req.params.id)
      res.status(HttpStatusCode.OK).json()
    } catch (error) {
      res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'error' })
    }
  })

router
  .route('/rooms')
  .get(async (req: Request, res: Response) => {
    try {
      const rooms: Location[] = await locationsController.getRooms()
      res.status(HttpStatusCode.OK).json(rooms)
    } catch (error) {
      res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'error' })
    }
  })
  .post(async (req: Request, res: Response) => {
    try {
      const msg: RoomInsertion = locationPresenter.parseRoomInsertion(req.body)
      await locationsController.createRoom(msg.description, msg.buildingId)
      res.status(HttpStatusCode.CREATED).json()
    } catch (error) {
      res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'error' })
    }
  })

router.route('/rooms/:id').put(async (req: Request, res: Response) => {
  try {
    const msg: RoomUpdate = locationPresenter.parseRoomInsertion(req.body)
    await locationsController.updateRoom(req.params.id, msg.description)
    res.status(HttpStatusCode.OK).json()
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'error' })
  }
})

router
  .route('/buildings')
  .get(async (req: Request, res: Response) => {
    try {
      const buildings: Location[] = await locationsController.getBuildings()
      buildings.forEach(building => {
        locationPresenter.parse(building)
      })
      res.status(HttpStatusCode.OK).json(buildings)
    } catch (error) {
      res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'error' })
    }
  })
  .post(async (req: Request, res: Response) => {
    try {
      const msg: BuildingInsertion = locationPresenter.parseBuildingInsertion(req.body)
      await locationsController.createBuilding(msg.description, msg.address, msg.external)
      res.status(HttpStatusCode.CREATED).json()
    } catch (error) {
      res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'error' })
    }
  })

router.route('/buildings/:id').put(async (req: Request, res: Response) => {
  try {
    const msg: BuildingInsertion = locationPresenter.parseBuildingInsertion(req.body)
    await locationsController.updateBuilding(req.params.id, msg.description, msg.address, msg.external)
    res.status(HttpStatusCode.OK).json()
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'error' })
  }
})

router.route('/buildings/:buildingId/rooms').get(async (req: Request, res: Response) => {
  try {
    const rooms: Location[] = await locationsController.getBuildingRooms(req.params.buildingId)
    rooms.forEach(room => {
      locationPresenter.parse(room)
    })
    res.status(HttpStatusCode.OK).json(rooms)
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'error' })
  }
})
