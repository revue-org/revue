from app.domain.device.core import DeviceId


class Anomaly:
    def __init__(self, anomaly_id: str, device_id: DeviceId, timestamp: str):
        self._anomaly_id = anomaly_id
        self._device_id = device_id
        self._timestamp = timestamp

    @property
    def anomaly_id(self) -> str:
        return self._anomaly_id

    @property
    def device_id(self) -> DeviceId:
        return self._device_id

    @device_id.setter
    def device_id(self, device_id: DeviceId):
        self._device_id = device_id

    @property
    def timestamp(self) -> str:
        return self._timestamp
