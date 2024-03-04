from app.domain.device.core import DeviceId
from . import ObjectClass, Anomaly


class Intrusion(Anomaly):
    def __init__(
        self,
        anomaly_id: str,
        device_id: DeviceId,
        timestamp: str,
        intrusion_object: ObjectClass,
    ):
        super().__init__(anomaly_id, device_id, timestamp)
        self._intrusion_object: ObjectClass = intrusion_object

    @property
    def intrusion_object(self) -> ObjectClass:
        return self._intrusion_object

    @intrusion_object.setter
    def intrusion_object(self, intrusion_object: ObjectClass):
        self._intrusion_object = intrusion_object
