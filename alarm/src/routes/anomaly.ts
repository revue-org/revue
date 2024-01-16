import { anomalyController } from '../controller/anomaly.js'
import express, { Request, Response, Router } from 'express'
import { Intrusion } from '@domain/anomaly/core/Intrusion.js'
import { Exceeding } from '@domain/anomaly/core/Exceeding.js'
import { Anomaly } from '@domain/anomaly/core/Anomaly.js'
import { AnomalyTypeConverter } from '@utils/AnomalyTypeConverter.js'
import { AnomalyType } from '@domain/anomaly/core/impl/enum/AnomalyType.js'
import { DeviceIdFactoryImpl } from '@domain/device/factories/impl/DeviceIdFactoryImpl.js'
import { MeasureConverter } from '@utils/MeasureConverter.js'
import { ObjectClassConverter } from '@utils/ObjectClassConverter.js'
import { DeviceIdFactory } from '@domain/device/factories/DeviceIdFactory'

export const anomalyRouter: Router = express.Router()
const deviceIdFactory: DeviceIdFactory = new DeviceIdFactoryImpl()

anomalyRouter.route('/:id').get((req: Request, res: Response): void => {
  anomalyController
    .getAnomalyById(req.params.id)
    .then((anomaly: Anomaly): void => {
      res.send(anomaly)
    })
    .catch((): void => {
      res.send({ error: 'No anomaly found' })
    })
})

anomalyRouter.route('/intrusion').get((req: Request, res: Response): void => {
  anomalyController
    .getIntrusions()
    .then((intrusions: Intrusion[]): void => {
      res.send(intrusions)
    })
    .catch((): void => {
      res.send({ error: 'No intrusions found' })
    })
})
anomalyRouter.route('/exceeding').get((req: Request, res: Response): void => {
  anomalyController
    .getExceedings()
    .then((exceedings: Exceeding[]): void => {
      res.send(exceedings)
    })
    .catch((): void => {
      res.send({ error: 'No exceedings found' })
    })
})
anomalyRouter.route('/').post((req: Request, res: Response): void => {
  switch (AnomalyTypeConverter.convertToAnomalyType(req.body.type)) {
    case AnomalyType.EXCEEDING:
      anomalyController
        .createExceeding(
          deviceIdFactory.createSensorId(req.body.deviceId.code),
          MeasureConverter.convertToMeasure(req.body.measure),
          req.body.value
        )
        .then((): void => {
          res.send({ success: 'Exceeding created' })
        })
        .catch(() => {
          res.send({ error: 'Exceeding not created' })
        })
      break
    case AnomalyType.INTRUSION:
      anomalyController
        .createIntrusion(
          deviceIdFactory.createCameraId(req.body.deviceId.code),
          ObjectClassConverter.convertToObjectClass(req.body.intrusionObject)
        )
        .then((): void => {
          res.send({ success: 'Intrusion created' })
        })
        .catch(() => {
          res.send({ error: 'Intrusion not created' })
        })
      break
    default:
      res.send({ error: 'Anomaly not created' })
  }
})
anomalyRouter.route('/').put((req: Request, res: Response): void => {
  switch (AnomalyTypeConverter.convertToAnomalyType(req.body.type)) {
    case AnomalyType.EXCEEDING:
      anomalyController
        .updateExceeding(
          req.body.id,
          deviceIdFactory.createSensorId(req.body.deviceId.code),
          new Date(req.body.timestamp),
          MeasureConverter.convertToMeasure(req.body.measure),
          req.body.value
        )
        .then((): void => {
          res.send({ success: 'Exceeding updated' })
        })
        .catch(() => {
          res.send({ error: 'Exceeding not updated' })
        })
      break
    case AnomalyType.INTRUSION:
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
      break
    default:
      res.send({ error: 'Anomaly not updated' })
  }
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
