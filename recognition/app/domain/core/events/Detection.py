from typing import Literal

from app.domain.core import ObjectClass
from app.domain.core.events import DeviceEvent


class Detection(DeviceEvent):
    objectClass: ObjectClass
    type: Literal['detection']
