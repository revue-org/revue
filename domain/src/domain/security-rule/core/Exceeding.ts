import {SecurityRule} from "./SecurityRule";

export interface Exceeding extends SecurityRule {
    getExceedingValue(): number;
}
