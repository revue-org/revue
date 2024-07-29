from datetime import datetime, time

from app.domain.core.rules import IntrusionRule


def is_intrusion_rule_active(intrusion_rule: IntrusionRule, time_to_check=None) -> bool:
    """
    Check if the intrusion rule is active at the given time. If the time is not given, the current time is used.
    :param intrusion_rule: the intrusion rule
    :param time_to_check: the given time to check if the intrusion rule is active
    :return: True if the intrusion rule is active at the given time, False otherwise
    """
    if time_to_check is None:
        time_to_check: time = time(
            datetime.now().hour, datetime.now().minute, datetime.now().second
        )
    start: time = time.fromisoformat(intrusion_rule.from_date.time().isoformat())
    end: time = time.fromisoformat(intrusion_rule.to_date.time().isoformat())
    return start <= time_to_check <= end
