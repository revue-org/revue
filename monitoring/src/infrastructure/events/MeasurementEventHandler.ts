import { Measurement } from "common/dist/domain/core";
import { io } from "@/index";

export const measurementsHandlers = async (measurement: Measurement): Promise<void> => {
  console.log(measurement)
  io.emit('measurement', { measurement: measurement })
  //TODO: to check how to handle the measurement in the frontend
  //qui devo mandare la misura all'utente attraverso le socket
}