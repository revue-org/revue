from . import Device, DeviceId, Resolution


class Camera(Device):
    def __init__(self, device_id: DeviceId, is_capturing: bool, ip_address: str, resolution: Resolution):
        super().__init__(device_id, is_capturing, ip_address)
        self._resolution = resolution

    @property
    def resolution(self) -> Resolution:
        return self._resolution

    @resolution.setter
    def resolution(self, resolution: Resolution):
        self._resolution = resolution

    def start_capturing(self):
        self._is_capturing = True

    def stop_capturing(self):
        self._is_capturing = False
