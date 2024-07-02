import express, { Request, Response, Router } from 'express'
import { deviceController } from '@/infrastructure/api/controllers/devices.js'
import { Device } from '@/domain/core/Device.js'
import { CapabilityType } from '@/domain/core/capabilities/CapabilityType.js'
import HttpStatusCode from '@common/utils/HttpStatusCode.js'
import { DeviceId } from '@/domain/core/DeviceId.js'
import { DeviceCapability } from '@/domain/core/capabilities/DeviceCapability'
import { DevicePresenter } from '@/presentation/api/DevicePresenter'
import { ZodDevicePresenter } from '@/presentation/api/impl/ZodDevicePresenter.js'
import { DeviceInsertion, DeviceUpdate } from '@/presentation/api/schemas/DeviceSchemas'

export const deviceRouter: Router = express.Router()
const devicePresenter: DevicePresenter = new ZodDevicePresenter()

deviceRouter.route('/').get((req: Request, res: Response): void => {
  const capabilities: CapabilityType[] = req.query.capabilities
    ? req.query.capabilities
        .toString()
        .split(',')
        .map((capability: string): CapabilityType => {
          if (Object.values(CapabilityType).includes(capability as CapabilityType)) {
            return capability as CapabilityType
          } else {
            throw new Error('Invalid capability')
          }
        })
    : []

  deviceController
    .getDevices(capabilities)
    .then((devices: Device[]): void => {
      devices.forEach((device: Device): void => {
        devicePresenter.parse(device)
      })
      res.status(HttpStatusCode.OK).send(devices)
    })
    .catch((): void => {
      res.status(HttpStatusCode.BAD_REQUEST).send({ error: 'Bad request' })
    })
})

deviceRouter.route('/:id').get((req: Request, res: Response): void => {
  deviceController
    .getDeviceById(req.params.id)
    .then((device: Device): void => {
      res.status(HttpStatusCode.OK).send(device)
    })
    .catch((): void => {
      res.send({ error: 'No device found' })
    })
})

deviceRouter.route('/:id/capabilities').get((req: Request, res: Response): void => {
  deviceController
    .getDeviceCapabilities(req.params.id)
    .then((capabilities: DeviceCapability[]): void => {
      res.status(HttpStatusCode.OK).send(capabilities)
    })
    .catch((): void => {
      res.send({ error: 'No device found' })
    })
})

deviceRouter.route('/actives').get((_req: Request, res: Response): void => {
  deviceController
    .getActiveDevices()
    .then((devices: Device[]): void => {
      res.status(HttpStatusCode.OK).send(devices)
    })
    .catch((): void => {
      res.send({ error: 'No active devices found' })
    })
})

deviceRouter.route('/locations/:id/devices').get((_req: Request, res: Response): void => {
  deviceController
    .getDevicesByLocationId(_req.params.id)
    .then((devices: Device[]): void => {
      res.status(HttpStatusCode.OK).send(devices)
    })
    .catch((): void => {
      res.send({ error: 'No devices found for location' })
    })
})

deviceRouter.route('/').post((req: Request, res: Response): void => {
  try {
    req.body.endpoint.port = parseInt(req.body.endpoint.port)
    const message: DeviceInsertion = devicePresenter.parseInsertion(req.body)
    deviceController
      .createDevice(
        message.description,
        message.endpoint.ipAddress,
        message.endpoint.port,
        message.locationId
      )
      .then((id: DeviceId): void => {
        res.status(HttpStatusCode.CREATED).send({ success: id })
      })
  } catch (e) {
    console.log(e)
    res.status(HttpStatusCode.BAD_REQUEST).send({ error: 'Device not created' })
  }
})

deviceRouter.route('/:id').put((req: Request, res: Response): void => {
  try {
    const message: DeviceUpdate = devicePresenter.parseUpdate(req.body)
    deviceController
      .updateDevice(
        req.params.id,
        message.description,
        message.endpoint.ipAddress,
        message.endpoint.port,
        message.locationId,
        message.isEnabled
      )
      .then((): void => {
        res.status(HttpStatusCode.OK).send({ success: 'Device correctly updated' })
      })
  } catch (e) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ error: 'Device not updated' })
  }
})

deviceRouter.route('/:id').delete((req: Request, res: Response): void => {
  deviceController
    .deleteDevice(req.params.id)
    .then((): void => {
      res.status(HttpStatusCode.OK).send({ success: 'Device correctly deleted' })
    })
    .catch((ee): void => {
      console.log(ee)
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ error: 'Device not deleted' })
    })
})
