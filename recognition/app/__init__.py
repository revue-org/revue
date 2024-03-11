import os
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, time
from os.path import join, dirname
from typing import List

import requests
from dotenv import load_dotenv
from flask import Flask

from app.Recognizer import Recognizer
from app.domain.securityrule.core import IntrusionRule
from app.presentation.securityrule.IntrusionRuleSerializer import (
    IntrusionRuleSerializer,
)
from app.utils.Logger import logger
from app.utils.interval import set_interval

dotenv_path = join(dirname(__file__), "../../.env")
load_dotenv(dotenv_path)
ALARM_PORT = os.environ.get("ALARM_PORT")
ALARM_HOST = "localhost"  # os.environ.get("ALARM_HOST")
DEV_API_KEY = os.environ.get("DEV_API_KEY")
executor = ThreadPoolExecutor()

rules_per_camera: dict = {}


def create_app():
    app = Flask(__name__)

    intrusion_rules: List[dict] = get_intrusion_rules()
    logger.info(intrusion_rules)

    for intrusion_rule_dict in intrusion_rules:
        intrusion_rule = IntrusionRuleSerializer().deserialize(intrusion_rule_dict)

        if intrusion_rule.device_id.code not in rules_per_camera:
            rules_per_camera[intrusion_rule.device_id.code]: List[IntrusionRule] = [
                intrusion_rule
            ]
        else:
            rules_per_camera[intrusion_rule.device_id.code].append(intrusion_rule)

    for camera in rules_per_camera:
        intrusion_rules: List[IntrusionRule] = rules_per_camera[camera]
        rtsp_stream_url: str = f"rtsp://localhost:8554/{camera}"
        object_to_recognize: List[str] = [
            rule.object_class.name.lower() for rule in intrusion_rules
        ]
        recognizer = Recognizer(rtsp_stream_url, object_to_recognize)
        logger.info(is_intrusion_rule_active(intrusion_rules[0]))
        executor.submit(recognizer.start_recognizing)

    set_interval(recognizer.stop_recognizing, seconds=60)

    return app


def get_intrusion_rules() -> List[dict]:
    url = f"http://{ALARM_HOST}:{ALARM_PORT}/security-rules/intrusions"
    headers = {"Authorization": f"Bearer {DEV_API_KEY}"}
    r = requests.get(url, headers=headers)
    return r.json()
