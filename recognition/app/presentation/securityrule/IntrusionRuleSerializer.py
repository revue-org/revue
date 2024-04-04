from datetime import datetime
from typing import List

from app.domain.anomaly.core import ObjectClass
from app.domain.device.core import DeviceId, DeviceType
from app.domain.monitoring.core import ContactType, Contact
from app.domain.securityrule.core import IntrusionRule


class IntrusionRuleSerializer:

    @staticmethod
    def deserialize(data: dict) -> IntrusionRule:
        print(data)
        security_rule_id = data["_id"]
        device_type: DeviceType = DeviceType(data["deviceId"]["type"])
        device_id: DeviceId = DeviceId(device_type, data["deviceId"]["code"])
        creator_id: str = data["creatorId"]
        description: str = data["description"]
        object_class: ObjectClass = ObjectClass(data["objectClass"])
        contacts_to_notify: List[Contact] = [
            Contact(item["value"], ContactType(item["type"]))
            for item in data["contactsToNotify"]
        ]

        from_date: datetime = datetime.fromisoformat(
            data["from"].replace("Z", "+00:00")
        )
        to_date: datetime = datetime.fromisoformat(data["to"].replace("Z", "+00:00"))
        return IntrusionRule(
            object_class,
            security_rule_id,
            device_id,
            creator_id,
            contacts_to_notify,
            description,
            from_date,
            to_date,
        )

    @staticmethod
    def serialize(security_rule: IntrusionRule) -> dict:
        return {
            "_id": security_rule.security_rule_id,
            "deviceId": {
                "type": security_rule.device_id.type.value,
                "code": security_rule.device_id.code,
            },
            "creatorId": security_rule.creator_id,
            "description": security_rule.description,
            "objectClass": security_rule.object_class.value,
            "contactsToNotify": [
                {"type": contact.contact_type.value, "value": contact.value}
                for contact in security_rule.contacts_to_notify
            ],
            "from": security_rule.from_date.isoformat().replace("+00:00", ".000Z"),
            "to": security_rule.to_date.isoformat().replace("+00:00", ".000Z"),
        }
