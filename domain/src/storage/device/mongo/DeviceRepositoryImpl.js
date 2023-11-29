import { cameraModel } from './schemas/CameraSchema';
import { DeviceType } from '../../../domain/device/core/DeviceType';
import { sensorModel } from './schemas/SensorSchema';
class DeviceRepositoryImpl {
    getAllDevices() {
        //TODO: to check if this && works
        return this.getCameras() && this.getSensors();
    }
    getCameras() {
        return cameraModel.find();
    }
    getSensors() {
        return sensorModel.find();
    }
    getDevice(deviceId) {
        switch (deviceId.getType()) {
            case DeviceType.CAMERA:
                return cameraModel.findById(deviceId);
            case DeviceType.SENSOR:
                return sensorModel.findById(deviceId);
        }
    }
    async insertDevice(device) {
        switch (device.getDeviceId().getType()) {
            case DeviceType.CAMERA:
                await new cameraModel(device).save();
                break;
            case DeviceType.SENSOR:
                await new sensorModel(device).save();
                break;
        }
    }
    async deleteDevice(deviceId) {
        switch (deviceId.getType()) {
            case DeviceType.CAMERA:
                await cameraModel.findByIdAndDelete(deviceId);
                break;
            case DeviceType.SENSOR:
                await sensorModel.findByIdAndDelete(deviceId);
                break;
        }
        throw new Error('Device not found');
    }
}
