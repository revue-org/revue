import {Device} from "../core/Device";

interface DeviceFactory {
    createSensor(): Device;

    createCamera(): Device;
}
