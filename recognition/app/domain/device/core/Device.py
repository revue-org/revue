from . import DeviceId, Resolution


class Device:
    def __init__(self, device_id: DeviceId, is_capturing: bool, ip_address: str, resolution: Resolution):
        self._device_id: DeviceId = device_id
        self._ip_address: str = ip_address
        self._is_capturing: bool = is_capturing

    @property
    def device_id(self) -> DeviceId:
        return self._device_id

    @property
    def ip_address(self) -> str:
        return self._ip_address

    @ip_address.setter
    def ip_address(self, ip_address: str):
        self._ip_address = ip_address

    @property
    def is_capturing(self) -> bool:
        return self._is_capturing

    def start_capturing(self):
        self._is_capturing = True

    def stop_capturing(self):
        self._is_capturing = False
