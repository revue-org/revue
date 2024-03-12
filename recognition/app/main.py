import os
from os.path import join, dirname
from typing import List

import requests
from dotenv import load_dotenv
from flask import Flask

from app.domain.securityrule.core import IntrusionRule
from app.domain.securityrule.utils.utils import is_intrusion_rule_active
from app.presentation.securityrule.IntrusionRuleSerializer import (
    IntrusionRuleSerializer,
)
from app.recognizer.Recognizer import Recognizer
from app.recognizer.RecognizersManager import RecognizersManager
from app.utils.Logger import logger
from app.utils.interval import set_interval

dotenv_path = join(dirname(__file__), "../../.env")
load_dotenv(dotenv_path)
ALARM_PORT = os.environ.get("ALARM_PORT")
ALARM_HOST = "localhost"  # os.environ.get("ALARM_HOST")
DEV_API_KEY = os.environ.get("DEV_API_KEY")

intrusion_rules: List[IntrusionRule] = []
manager = RecognizersManager()


def create_app():
    app = Flask(__name__)

    intrusion_rules.append(*get_intrusion_rules())
    logger.info(intrusion_rules)
    enable_intrusion_rules()

    set_interval(check_rule_update, seconds=60)
    set_interval(check_rule_validity, seconds=60)
    return app


def get_intrusion_rules() -> List[IntrusionRule]:
    url = f"http://{ALARM_HOST}:{ALARM_PORT}/security-rules/intrusions"
    headers = {"Authorization": f"Bearer {DEV_API_KEY}"}
    res = requests.get(url, headers=headers)
    rules: List[IntrusionRule] = []
    for intrusion_rule_dict in res.json():
        intrusion_rule = IntrusionRuleSerializer().deserialize(intrusion_rule_dict)
        rules.append(intrusion_rule)

    return rules


def enable_intrusion_rules() -> None:
    for intrusion_rule in intrusion_rules:
        if is_intrusion_rule_active(intrusion_rule):
            manager.add_object_to_recognize(
                intrusion_rule.object_class.name.lower(), intrusion_rule.device_id.code
            )


def check_rule_update() -> None:
    new_intrusion_rules = get_intrusion_rules()
    if new_intrusion_rules != intrusion_rules:
        intrusion_rules.clear()
        intrusion_rules.append(*new_intrusion_rules)
        manager.remove_all_objects_to_recognize()
        enable_intrusion_rules()


def check_rule_validity() -> None:
    for intrusion_rule in intrusion_rules:
        if not is_intrusion_rule_active(intrusion_rule):
            manager.remove_object_to_recognize(
                intrusion_rule.object_class.name.lower(), intrusion_rule.device_id.code
            )
