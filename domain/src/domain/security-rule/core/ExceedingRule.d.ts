import { SecurityRule } from "./SecurityRule";
import { Measure } from "../../device/core/Measure";
export interface ExceedingRule extends SecurityRule {
    getMinValue(): number;
    getMaxValue(): number;
    getMeasure(): Measure;
}
