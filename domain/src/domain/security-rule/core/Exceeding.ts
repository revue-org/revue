import {SecurityRule} from "./SecurityRule";
import {Measure} from "../../device/core/Measure";

export interface Exceeding extends SecurityRule {
    getValue(): number;
    getMeasure(): Measure;
}
