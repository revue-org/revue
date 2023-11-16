import {Contact} from "../../monitoring/core/Contact";
import {DeviceId} from "../../device/core/DeviceId";

export interface SecurityRule {
    getSecurityRuleId(): number;

    getDeviceId(): DeviceId;

    getCreatorId(): number;

    getContactsToNotify(): Set<Contact>;

    getDescription(): string;

    getFrom(): Date;

    getTo(): Date;
}
