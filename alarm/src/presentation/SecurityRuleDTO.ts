import { SecurityRule } from "@/domain/core/rules/SecurityRule";

export interface SecurityRuleDTO extends DTO<SecurityRule> {

    type: "range" | "intrusion";
    creatorId: userIdDTO;
    activeOn: deviceIdDTO;
    description: string;
    contacts: contactDTO[];
    enabled: boolean;
    validity: timeSlotDTO;
    data: OutlierRuleDataDTO | IntrusionRuleDataDTO;

    toModel(): SecurityRule
}