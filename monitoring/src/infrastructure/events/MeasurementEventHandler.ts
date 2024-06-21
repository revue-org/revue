import { Measurement } from 'common/dist/domain/core'
import { io } from '@/index'
import * as console from 'node:console'

export const measurementsHandlers = async (measurement: Measurement): Promise<void> => {
  console.log('TO DELETE:')
  console.log(measurement)
  //TODO: to check how to handle the measurement in the frontend
  io.emit('measurement', { measurement: measurement })
}
