from datetime import datetime, time

from app.domain.securityrule.core import IntrusionRule


def is_intrusion_rule_active(intrusion_rule: IntrusionRule, check_time=None) -> bool:
    """Check if current time is within the range of the intrusion rule validity"""
    if check_time is None:
        check_time: time = time(datetime.now().hour, datetime.now().minute, datetime.now().second)
    start: time = time.fromisoformat(intrusion_rule.from_date.time().isoformat())
    end: time = time.fromisoformat(intrusion_rule.to_date.time().isoformat())
    return start <= check_time <= end
