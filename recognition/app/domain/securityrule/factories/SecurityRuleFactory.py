import datetime
from typing import List

from app.domain.anomaly.core import ObjectClass
from app.domain.device.core import DeviceId
from app.domain.monitoring.core import Contact
from app.domain.securityrule.core import IntrusionRule


class SecurityRuleFactory:

    def create_intrusion_rule(self, device_id: DeviceId, object_classes: List[ObjectClass], contacts: List[Contact],
                              start_time: datetime, end_time: datetime) -> IntrusionRule:
        return IntrusionRule(device_id, object_classes, contacts, start_time, end_time)
