import express, { Request, Response, Router } from 'express'
import { deviceController } from '@/infrastructure/api/controllers/devices.js'
import { Device } from '@/domain/core/Device.js'
import { DeviceCapability } from '@/domain/core/capabilities/DeviceCapability.js'
import { CapabilityType } from '@/domain/core/capabilities/CapabilityType.js'
import { CapabilityFactory } from '@/domain/factories/CapabilityFactory.js'
import { MeasureFactory } from '@common/domain/factories/MeasureFactory.js'
import HttpStatusCode from '@common/utils/HttpStatusCode.js'
import { DeviceId } from '@/domain/core/DeviceId.js'

export const deviceRouter: Router = express.Router()

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
      res.status(HttpStatusCode.OK).send(devices)
    })
    .catch((): void => {
      res.send({ error: 'No devices found' })
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

deviceRouter.route('/').post((req: Request, res: Response): void => {
  const capabilities: DeviceCapability[] = req.body.capabilities.map((capability: any): DeviceCapability => {
    return capability.type === CapabilityType.VIDEO
      ? CapabilityFactory.videoStreamingCapabilityOf(capability.resolution)
      : CapabilityFactory.sensoringCapabilityOf(
          capability.capturingInterval,
          MeasureFactory.createMeasure(capability.measure.type, capability.measure.unit)
        )
  })
  deviceController
    .createDevice(req.body.description, req.body.ipAddress, req.body.port, req.body.locationId, capabilities)
    .then((id: DeviceId): void => {
      res.status(HttpStatusCode.CREATED).send({ success: id })
    })
    .catch((): void => {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ error: 'Device not created' })
    })
})

deviceRouter.route('/:id').put((req: Request, res: Response): void => {
  const capabilities: DeviceCapability[] = req.body.capabilities.map((capability: any): DeviceCapability => {
    return capability.type === CapabilityType.VIDEO
      ? CapabilityFactory.videoStreamingCapabilityOf(capability.resolution)
      : CapabilityFactory.sensoringCapabilityOf(
          capability.capturingInterval,
          MeasureFactory.createMeasure(capability.measure.type, capability.measure.unit)
        )
  })
  deviceController
    .updateDevice(
      req.params.id,
      req.body.description,
      req.body.address,
      req.body.port,
      req.body.locationId,
      req.body.enabled,
      capabilities
    )
    .then((): void => {
      res.status(HttpStatusCode.OK).send({ success: 'Device correctly updated' })
    })
    .catch((): void => {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ error: 'Device not updated' })
    })
})

deviceRouter.route('/:id').delete((req: Request, res: Response): void => {
  deviceController
    .deleteDevice(req.params.id)
    .then((): void => {
      res.status(HttpStatusCode.OK).send({ success: 'Device correctly deleted' })
    })
    .catch((): void => {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ error: 'Device not deleted' })
    })
})
