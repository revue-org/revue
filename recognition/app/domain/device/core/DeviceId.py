from .enum import DeviceType


class DeviceId:
    def __init__(self, device_type: DeviceType, code: str):
        self._type = device_type
        self._code: str = code

    def __eq__(self, other):
        return self.type == other.type and self.code == other.code

    @property
    def type(self):
        return self._type

    @type.setter
    def type(self, device_type):
        self._type = device_type

    @property
    def code(self) -> str:
        return self._code

    @code.setter
    def code(self, code: str) -> None:
        self._code = code
