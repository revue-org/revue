import { AlarmService } from "../core/AlarmService";
import { Notification } from "../core/Notification";
export interface AnomalyFactory {
    createIntrusion(): AlarmService;
    createExceeding(): Notification;
}
