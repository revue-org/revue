import unittest
from datetime import datetime

from app.domain.anomaly.core import ObjectClass
from app.domain.device.core import DeviceId, DeviceType
from app.domain.monitoring.core import Contact, ContactType
from app.domain.securityrule.core import IntrusionRule
from app.presentation.securityrule import IntrusionRuleSerializer


class IntrusionRuleSerializerTest(unittest.TestCase):

    def setUp(self):
        self.intrusion_rule_json = {'_id': 'id',
                                    'deviceId': {'type': 0, 'code': 'cam-01'},
                                    'creatorId': 'creator',
                                    'description': 'Intrusion rule description',
                                    'objectClass': 0,
                                    'contactsToNotify': [
                                        {'type': 1, 'value': '3333333333'},
                                        {'type': 0, 'value': 'email@gmail.com'}
                                    ],
                                    'from': '2020-01-01T01:00:00.000Z',
                                    'to': '2030-01-01T05:00:00.000Z'}
        self.intrusion_rule: IntrusionRule = IntrusionRule(ObjectClass.PERSON, 'id',
                                                           DeviceId(DeviceType.CAMERA, 'cam-01'),
                                                           'creator',
                                                           [Contact('3333333333', ContactType.SMS),
                                                            Contact('email@gmail.com', ContactType.EMAIL)],
                                                           'Intrusion rule description',
                                                           datetime.fromisoformat(
                                                               '2020-01-01T01:00:00.000Z'.replace('Z', '+00:00')),
                                                           datetime.fromisoformat(
                                                               '2030-01-01T05:00:00.000Z'.replace('Z', '+00:00')))

    def test_deserialize(self):
        self.assertEqual(self.intrusion_rule, IntrusionRuleSerializer().deserialize(self.intrusion_rule_json))

    def test_serialize(self):
        self.assertEqual(self.intrusion_rule_json, IntrusionRuleSerializer().serialize(self.intrusion_rule))
