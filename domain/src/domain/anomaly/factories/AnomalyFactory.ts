import {Intrusion} from "../core/Intrusion";
import {Exceeding} from "../core/Exceeding";

export interface AnomalyFactory {
    createIntrusion(): Intrusion;

    createExceeding(): Exceeding;
}
