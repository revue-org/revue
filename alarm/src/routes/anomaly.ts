import { anomalyController } from '../controller/anomaly.js'
import express, { Request, Response, Router } from 'express'
import { Intrusion } from '@domain/anomaly/core/Intrusion.js'
import { Exceeding } from '@domain/anomaly/core/Exceeding.js'
import { Anomaly } from '@domain/anomaly/core/Anomaly.js'
import { DeviceIdFactoryImpl } from '@domain/device/factories/impl/DeviceIdFactoryImpl.js'
import { MeasureConverter } from '@utils/MeasureConverter.js'
import { ObjectClassConverter } from '@utils/ObjectClassConverter.js'
import { DeviceIdFactory } from '@domain/device/factories/DeviceIdFactory.js'
import HttpStatusCode from '../utils/HttpStatusCode.js'

export const anomalyRouter: Router = express.Router()
const deviceIdFactory: DeviceIdFactory = new DeviceIdFactoryImpl()

anomalyRouter.route('/intrusions').get((req: Request, res: Response): void => {
  anomalyController
    .getIntrusions()
    .then((intrusions: Intrusion[]): void => {
      res.status(HttpStatusCode.OK).send(intrusions)
    })
    .catch((): void => {
      res.send({ error: 'No intrusions found' })
    })
})
anomalyRouter.route('/exceedings').get((req: Request, res: Response): void => {
  anomalyController
    .getExceedings()
    .then((exceedings: Exceeding[]): void => {
      res.status(HttpStatusCode.OK).send(exceedings)
    })
    .catch((): void => {
      res.send({ error: 'No exceedings found' })
    })
})

anomalyRouter.route('/:id').get((req: Request, res: Response): void => {
  anomalyController
    .getAnomalyById(req.params.id)
    .then((anomaly: Anomaly): void => {
      res.status(HttpStatusCode.OK).send(anomaly)
    })
    .catch((): void => {
      res.send({ error: 'No anomaly found' })
    })
})
anomalyRouter.route('/exceedings').post((req: Request, res: Response): void => {
  anomalyController
    .createExceeding(
      deviceIdFactory.createSensorId(req.body.deviceId.code),
      MeasureConverter.convertToMeasure(req.body.measure),
      req.body.value
    )
    .then((): void => {
      res.status(HttpStatusCode.CREATED).send({ success: 'Exceeding created' })
    })
    .catch((): void => {
      res.send({ error: 'Exceeding not created' })
    })
})

anomalyRouter.route('/intrusions').post((req: Request, res: Response): void => {
  anomalyController
    .createIntrusion(
      deviceIdFactory.createCameraId(req.body.deviceId.code),
      ObjectClassConverter.convertToObjectClass(req.body.intrusionObject)
    )
    .then((): void => {
      res.status(HttpStatusCode.CREATED).send({ success: 'Intrusion created' })
    })
    .catch((): void => {
      res.send({ error: 'Intrusion not created' })
    })
})
anomalyRouter.route('/exceedings').put((req: Request, res: Response): void => {
  anomalyController
    .updateExceeding(
      req.body.id,
      deviceIdFactory.createSensorId(req.body.deviceId.code),
      new Date(req.body.timestamp),
      MeasureConverter.convertToMeasure(req.body.measure),
      req.body.value
    )
    .then((): void => {
      res.status(HttpStatusCode.OK).send({ success: 'Exceeding updated' })
    })
    .catch(() => {
      res.send({ error: 'Exceeding not updated' })
    })
})

anomalyRouter.route('/intrusions').put((req: Request, res: Response): void => {
  anomalyController
    .updateIntrusion(
      req.body.id,
      deviceIdFactory.createCameraId(req.body.deviceId.code),
      new Date(req.body.timestamp),
      ObjectClassConverter.convertToObjectClass(req.body.intrusionObject)
    )
    .then((): void => {
      res.send({ success: 'Intrusion updated' })
    })
    .catch(() => {
      res.send({ error: 'Intrusion not updated' })
    })
})

anomalyRouter.route('/').delete((req: Request, res: Response): void => {
  anomalyController
    .deleteAnomaly(req.body.id, req.body.type)
    .then((): void => {
      res.send({ success: 'Anomaly correctly deleted' })
    })
    .catch((): void => {
      res.send({ error: 'Anomaly not deleted' })
    })
})
