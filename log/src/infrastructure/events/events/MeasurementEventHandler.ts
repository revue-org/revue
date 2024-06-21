import { Measurement } from 'common/dist/domain/core'

export const measurementsHandlers = async (measurement: Measurement): Promise<void> => {
  console.log('TO DELETE:')
  console.log(measurement)
}
