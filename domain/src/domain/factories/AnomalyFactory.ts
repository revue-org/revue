import {Intrusion} from "../core/Intrusion";
import {Exceeding} from "../core/Exceeding";

interface AnomalyFactory {
    createIntrusion(): Intrusion;

    createExceeding(): Exceeding;
}
