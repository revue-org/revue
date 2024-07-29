import unittest
from datetime import datetime, time

from app.domain.core.ObjectClass import ObjectClass
from app.domain.core.rules import IntrusionRule
from app.domain.core.utils import is_intrusion_rule_active
from app.domain.factories import SecurityRulesFactory


class IntrusionRuleTest(unittest.TestCase):

    def setUp(self):
        self.time_slot = SecurityRulesFactory.new_time_slot(
            from_=datetime(2022, 1, 1, 1, 0, 0),
            to=datetime(2022, 1, 1, 5, 0, 0),
        )
        self.intrusion_rule: IntrusionRule = SecurityRulesFactory.create_intrusion_rule(
            active_on="2022-01-01",
            creator_id="creator_id",
            object_class=ObjectClass.PERSON,
            contacts=[],
            description="description",
            validity=self.time_slot,
            enabled=True,
        )

    def test_valid_intrusion_rule(self):
        self.assertTrue(is_intrusion_rule_active(self.intrusion_rule, time(1, 0, 0)))
        self.assertTrue(is_intrusion_rule_active(self.intrusion_rule, time(3, 0, 0)))
        self.assertTrue(is_intrusion_rule_active(self.intrusion_rule, time(3, 40, 0)))
        self.assertTrue(is_intrusion_rule_active(self.intrusion_rule, time(5, 0, 0)))

    def test_invalid_intrusion_rule(self):
        self.assertFalse(is_intrusion_rule_active(self.intrusion_rule, time(0, 59, 0)))
        self.assertFalse(is_intrusion_rule_active(self.intrusion_rule, time(5, 0, 1)))
        self.assertFalse(is_intrusion_rule_active(self.intrusion_rule, time(6, 0, 0)))
        self.assertFalse(is_intrusion_rule_active(self.intrusion_rule, time(23, 59, 0)))
