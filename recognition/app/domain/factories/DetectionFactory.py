import uuid
from datetime import datetime

from app.domain.core.events import DomainEventId, Detection


class DetectionFactory:

    @staticmethod
    def new_id() -> DomainEventId:
        return DomainEventId(value=str(uuid.uuid4()))

    @staticmethod
    def id_of(value: str) -> DomainEventId:
        return DomainEventId(value=value)

    @staticmethod
    def detection_from(
        id_: DomainEventId,
        timestamp: datetime,
        source_device_id: str,
        object_class: str,
    ) -> Detection:
        return Detection(
            id=id_,
            type="detection",
            timestamp=timestamp,
            source_device_id=source_device_id,
            object_class=object_class,
        )

    @staticmethod
    def create_detection(
        timestamp: datetime, source_device_id: str, object_class: str
    ) -> Detection:
        return DetectionFactory.detection_from(
            DetectionFactory.new_id(), timestamp, source_device_id, object_class
        )
