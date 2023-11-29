import { MonitoringManager } from 'domain/dist/storage/monitoring/MonitoringManager.js';
const monitoringManager = new MonitoringManager();
export const userController = {
    getAllUsers: async (req, res) => {
        res.json(monitoringManager.getAllUsers());
    },
    getUser: async (req, res) => {
        /*try {
          res.json(await deviceModel.findById(req.params.id))
        } catch (err) {
          console.log(err)
        }*/
    },
    createUser: async (req, res) => {
        /*try {
          res.json(await deviceModel.findById(req.params.id))
        } catch (err) {
          console.log(err)
        }
        deviceModel.create({})*/
    },
    updateUser: async (req, res) => { }
};
