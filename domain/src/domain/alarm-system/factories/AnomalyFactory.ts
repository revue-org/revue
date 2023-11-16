import {AlarmService} from "../core/AlarmService";
import {Notification} from "../core/Notification";

interface AnomalyFactory {
    createIntrusion(): AlarmService;

    createExceeding(): Notification;
}
