import json
from datetime import datetime

from app.application import RecognitionEventsHub
from app.domain.core.events import Detection
from app.domain.factories import DetectionFactory
from app.infrastructure.events import Producer
from app.presentation import transform_keys, snake_to_camel


class RecognitionEventsHubImpl(RecognitionEventsHub):

    def __init__(self):
        self._producer = Producer()

    def publish_detection(self, camera_code: str, object_class: str):
        detection: Detection = DetectionFactory.create_detection(
            datetime.now(), camera_code, object_class
        )
        detection_to_publish = transform_keys(
            json.loads(detection.model_dump_json()), snake_to_camel
        )
        self._producer.produce("detections." + camera_code, detection_to_publish)
