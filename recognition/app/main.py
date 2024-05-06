from typing import List

import requests
import os
from flask import Flask

from app.domain.securityrule.core import IntrusionRule
from app.domain.securityrule.utils.utils import is_intrusion_rule_active
from app.presentation.securityrule.IntrusionRuleSerializer import (
    IntrusionRuleSerializer,
)
from app.recognizer.RecognizersManager import RecognizersManager
from app.utils.Logger import logger
from app.utils.env import RECOGNITION_BEARER_TOKEN, ALARM_PORT, ALARM_HOST
from app.utils.interval import set_interval

intrusion_rules: List[IntrusionRule] = []
manager = RecognizersManager()

os.environ["TEST"] = "false"


def create_app():
    logger.info(f"ENV: {os.environ.get('FLASK_ENV')}")
    app = Flask(__name__)
    logger.info(os.environ.get("FLASK_ENV"))
    intrusion_rules.append(*get_intrusion_rules())
    enable_intrusion_rules()

    set_interval(check_rule_update, seconds=60)
    set_interval(check_rule_validity, seconds=60)
    return app


def get_intrusion_rules() -> List[IntrusionRule]:
    url: str = f"http://{ALARM_HOST}:{ALARM_PORT}/security-rules/intrusions"
    logger.debug("URL: " + url)
    headers = {"Authorization": f"Bearer {RECOGNITION_BEARER_TOKEN}"}
    res = requests.get(url, headers=headers)
    rules: List[IntrusionRule] = []
    for intrusion_rule_dict in res.json():
        print(intrusion_rule_dict)
        intrusion_rule = IntrusionRuleSerializer().deserialize(intrusion_rule_dict)
        rules.append(intrusion_rule)

    return rules


def enable_intrusion_rules() -> None:
    for intrusion_rule in intrusion_rules:
        if is_intrusion_rule_active(intrusion_rule):
            manager.add_camera(intrusion_rule.device_id.code)


def check_rule_update() -> None:
    new_intrusion_rules = get_intrusion_rules()
    if new_intrusion_rules != intrusion_rules:
        intrusion_rules.clear()
        intrusion_rules.append(*new_intrusion_rules)
        manager.remove_all_cameras()
        enable_intrusion_rules()


def check_rule_validity() -> None:
    for intrusion_rule in intrusion_rules:
        if not is_intrusion_rule_active(intrusion_rule):
            manager.remove_camera(intrusion_rule.device_id.code)
