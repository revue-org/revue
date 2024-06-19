import express, { Router, Request, Response } from 'express'
import HttpStatusCode from 'common/dist/utils/HttpStatusCode.js'
import { locationsController } from '../controllers/locationController'

export const router: Router = express.Router()

router.route('/:id')
  .get((req: Request, res: Response) => {
    try {
      const location = locationsController.getLocationById(req.params.id)
      res.status(HttpStatusCode.OK).json(location)
    } catch (e) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'error' })
    }
  })
  .delete(async (req: Request, res: Response) => {
    try {
      await locationsController.deleteLocation(req.params.id)
      res.status(HttpStatusCode.OK).json()
    } catch (error) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'error' })
    }
  })

router.route('/rooms')
  .get(async (req: Request, res: Response) => {
    try {
      const rooms = await locationsController.getRooms()
      res.status(HttpStatusCode.OK).json(rooms)
    } catch (error) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'error' })
    }
  })
  .post(async (req: Request, res: Response) => {
    try {
      await locationsController.createRoom(req.body.description, req.body.buildingId)
      res.status(HttpStatusCode.CREATED).json()
    } catch (error) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'error' })
    }
  })

router.route('/rooms/:id')
  .put(async (req: Request, res: Response) => {
    try {
      await locationsController.updateRoom(req.params.id, req.body.description)
      res.status(HttpStatusCode.OK).json()
    } catch (error) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'error' })
    }
  })

router.route('/buildings')
  .get(async (req: Request, res: Response) => {
    try {
      const buildings = await locationsController.getBuildings()
      res.status(HttpStatusCode.OK).json(buildings)
    } catch (error) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'error' })
    }
  })
  .post(async (req: Request, res: Response) => {
    try {
      await locationsController.createBuilding(req.body.description, req.body.address, req.body.external)
      res.status(HttpStatusCode.CREATED).json()
    } catch (error) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'error' })
    }
  })

router.route('/buildings/:id')
  .put(async (req: Request, res: Response) => {
    try {
      await locationsController.updateBuilding(req.params.id, req.body.description, req.body.address, req.body.external)
      res.status(HttpStatusCode.OK).json()
    } catch (error) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'error' })
    }
  })

router.route('/buildings/:buildingId/rooms')
  .get(async (req: Request, res: Response) => {
    try {
      const rooms = await locationsController.getBuildingRooms(req.params.buildingId)
      res.status(HttpStatusCode.OK).json(rooms)
    } catch (error) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'error' })
    }
  })
