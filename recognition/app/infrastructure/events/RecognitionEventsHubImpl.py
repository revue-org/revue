from app.application import RecognitionEventsHub
from app.infrastructure.events import Producer


class RecognitionEventsHubImpl(RecognitionEventsHub):

    def __init__(self):
        self._producer = Producer()

    def publish_detection(self, camera_code: str, object_class: str):
        self._producer.produce("detections." + camera_code, object_class)
