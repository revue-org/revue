import { deviceController } from '../controller/device.js';
import express from 'express';
export const deviceRouter = express.Router();
deviceRouter.route('/').post((req, res) => {
    deviceController.createDevice(req, res);
});
deviceRouter.route('/cameras').get((req, res) => {
    deviceController.getCameras(req, res);
});
deviceRouter.route('/sensors').get((req, res) => {
    deviceController.getSensors(req, res);
});
/*deviceRouter
  .route('/:id')
  .get((req, res) => {
    deviceController.getDevice(req, res)
  })
  .put((req, res) => {})
  .delete((req, res) => {})*/
