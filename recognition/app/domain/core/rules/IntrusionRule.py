from typing import Literal

from app.domain.core import ObjectClass
from app.domain.core.rules import SecurityRule


class IntrusionRule(SecurityRule):
    type: Literal["intrusion"]
    object_class: ObjectClass
