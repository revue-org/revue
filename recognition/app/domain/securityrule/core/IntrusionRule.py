import datetime
from typing import List

from app.domain.anomaly.core import ObjectClass
from app.domain.device.core import DeviceId
from app.domain.monitoring.core import Contact


class IntrusionRule:
    def __init__(
        self,
        object_class: ObjectClass,
        security_rule_id: str,
        device_id: DeviceId,
        creator_id: str,
        contacts_to_notify: List[Contact],
        description: str,
        from_date: datetime,
        to_date: datetime,
    ):
        self._object_class = object_class
        self._security_rule_id = security_rule_id
        self._device_id = device_id
        self._creator_id = creator_id
        self._contacts_to_notify = contacts_to_notify
        self._description = description
        self._from_date = from_date
        self._to_date = to_date

    def __eq__(self, other):
        return (
            self.object_class == other.object_class
            and self.security_rule_id == other.security_rule_id
            and self.device_id == other.device_id
            and self.creator_id == other.creator_id
            and self.contacts_to_notify == other.contacts_to_notify
            and self.description == other.description
            and self.from_date == other.from_date
            and self.to_date == other.to_date
        )

    @property
    def object_class(self) -> ObjectClass:
        return self._object_class

    @object_class.setter
    def object_class(self, object_class: ObjectClass):
        self._object_class = object_class

    @property
    def security_rule_id(self) -> str:
        return self._security_rule_id

    @security_rule_id.setter
    def security_rule_id(self, security_rule_id: str):
        self._security_rule_id = security_rule_id

    @property
    def device_id(self) -> DeviceId:
        return self._device_id

    @device_id.setter
    def device_id(self, device_id: DeviceId):
        self._device_id = device_id

    @property
    def creator_id(self) -> str:
        return self._creator_id

    @creator_id.setter
    def creator_id(self, creator_id: str):
        self._creator_id = creator_id

    @property
    def contacts_to_notify(self) -> List[Contact]:
        return self._contacts_to_notify

    @contacts_to_notify.setter
    def contacts_to_notify(self, contacts_to_notify: List[Contact]):
        self._contacts_to_notify = contacts_to_notify

    @property
    def description(self) -> str:
        return self._description

    @description.setter
    def description(self, description: str):
        self._description = description

    @property
    def from_date(self) -> datetime:
        return self._from_date

    @from_date.setter
    def from_date(self, from_date: datetime):
        self._from_date = from_date

    @property
    def to_date(self) -> datetime:
        return self._to_date

    @to_date.setter
    def to_date(self, to_date: datetime):
        self._to_date = to_date
