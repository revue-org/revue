import {Anomaly} from "domain";

interface MonitoringRoom {
    registerDevice(device: string): void;
    enableDevice(deviceId: number): void;
    disableDevice(deviceId: number): void;
    createSecurityRule(): void;
    deleteSecurityRule(): void;
    getHistory(deviceId: number): Anomaly[];
}
class Ciao {
    constructor() {
        var a: Anomaly = new Anomaly();
    }
}

const test = new MonitoringRoom();
