import {SecurityRule} from "./SecurityRule";
import {ObjectClass} from "./ObjectClass";

export interface Intrusion extends SecurityRule {
    getIntrusionObject(): ObjectClass;
}
