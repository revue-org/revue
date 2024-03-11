import unittest
from datetime import datetime, time

from app.domain.anomaly.core import ObjectClass
from app.domain.device.core import DeviceId, DeviceType
from app.domain.monitoring.core import Contact, ContactType
from app.domain.securityrule.core import IntrusionRule
from app.domain.securityrule.utils.utils import is_intrusion_rule_active


class IntrusionRuleTest(unittest.TestCase):

    def setUp(self):
        self.intrusion_rule: IntrusionRule = IntrusionRule(
            ObjectClass.PERSON,
            "id-1",
            DeviceId(DeviceType.CAMERA, "cam-01"),
            "creator",
            [
                Contact("email@gmail.com", ContactType.EMAIL),
            ],
            "Intrusion rule description",
            datetime.fromisoformat("2020-01-01T01:00:00.000+00:00"),
            datetime.fromisoformat("2030-01-01T05:00:00.000+00:00"),
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
