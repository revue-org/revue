import { MonitoringManager } from 'domain/dist/storage/monitoring/MonitoringManager.js'
const monitoringManager = new MonitoringManager()
export const deviceController = {
  getCameras: async (req, res) => {
    // res.json(monitoringManager.getAllCameras())
  },
  getSensors: async (req, res) => {
    // res.json(monitoringManager.getAllSensors())
  },
  getDevice: async (req, res) => {
    /*try {
          res.json(await deviceModel.findById(req.params.id))
        } catch (err) {
          console.log(err)
        }*/
  },
  createDevice: async (req, res) => {
    /*try {
          res.json(await deviceModel.findById(req.params.id))
        } catch (err) {
          console.log(err)
        }
        deviceModel.create({})*/
  },
  updateDevice: async (req, res) => {}
}
