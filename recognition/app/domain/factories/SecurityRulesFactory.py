import uuid
from datetime import datetime
from typing import List

from app.domain.core import ObjectClass
from app.domain.core.rules import SecurityRuleId, Contact, TimeSlot, IntrusionRule


class SecurityRulesFactory:

    @staticmethod
    def new_id() -> SecurityRuleId:
        return SecurityRuleId(value=str(uuid.uuid4()))

    @staticmethod
    def id_of(id_: str) -> SecurityRuleId:
        return SecurityRuleId(value=id_)

    @staticmethod
    def intrusion_rule_of(
        id_: SecurityRuleId,
        active_on: str,
        creator_id: str,
        object_class: ObjectClass,
        contacts: List[Contact],
        description: str,
        validity: TimeSlot,
        enabled: bool,
    ) -> IntrusionRule:
        return IntrusionRule(
            id=id_,
            type="intrusion",
            active_on=active_on,
            creator_id=creator_id,
            object_class=object_class,
            contacts=contacts,
            description=description,
            validity=validity,
            enabled=enabled,
        )

    @staticmethod
    def create_intrusion_rule(
        active_on: str,
        creator_id: str,
        object_class: ObjectClass,
        contacts: List[Contact],
        description: str,
        validity: TimeSlot,
        enabled: bool,
    ) -> IntrusionRule:
        return SecurityRulesFactory.intrusion_rule_of(
            SecurityRulesFactory.new_id(),
            active_on,
            creator_id,
            object_class,
            contacts,
            description,
            validity,
            enabled,
        )

    @staticmethod
    def new_time_slot(from_: datetime, to: datetime) -> TimeSlot:
        if from_ >= to:
            raise ValueError("Invalid time slot")
        return TimeSlot(from_=from_, to=to)
