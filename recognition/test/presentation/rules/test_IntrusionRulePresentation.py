import datetime
import unittest
from typing import List

from app.domain.core import ObjectClass
from app.domain.core.rules import IntrusionRule, Contact, TimeSlot
from app.domain.factories import SecurityRulesFactory
from app.presentation import serialize, deserialize


class IntrusionRuleSerializerTest(unittest.TestCase):

    def setUp(self):
        self.from_ = datetime.datetime(2022, 1, 1, 0, 0, 0)
        self.to = datetime.datetime(2022, 1, 1, 23, 59, 59)
        self.intrusion_rule_dict: dict = {
            "id": {"value": "intrusion-rule-1"},
            "type": "intrusion",
            "active_on": "device-1",
            "creator_id": "creator",
            "object_class": "person",
            "contacts": [{"type": "email", "value": "email@email.com"}],
            "description": "Test intrusion rule 1",
            "validity": {"from_": self.from_.isoformat(), "to": self.to.isoformat()},
            "enabled": True,
        }
        self.contacts: List[Contact] = [
            Contact(type="email", value="email@email.com"),
        ]
        self.time_slot: TimeSlot = SecurityRulesFactory.new_time_slot(
            from_=self.from_,
            to=self.to,
        )
        self.intrusion_rule: IntrusionRule = SecurityRulesFactory.intrusion_rule_of(
            id_=SecurityRulesFactory.id_of("intrusion-rule-1"),
            active_on="device-1",
            creator_id="creator",
            object_class=ObjectClass.PERSON,
            contacts=self.contacts,
            description="Test intrusion rule 1",
            validity=self.time_slot,
            enabled=True,
        )

    def test_serialize(self):
        actual: dict = serialize(self.intrusion_rule)
        self.assertEqual(
            self.intrusion_rule_dict,
            actual,
        )

    def test_deserialize(self):
        actual: IntrusionRule = deserialize(self.intrusion_rule_dict, IntrusionRule)
        self.assertEqual(
            self.intrusion_rule,
            actual,
        )
