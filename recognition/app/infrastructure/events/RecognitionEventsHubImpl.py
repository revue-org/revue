from app.application import RecognitionEventsHub


class RecognitionEventsHubImpl(RecognitionEventsHub):

    def publish_detection(self, camera_code: str, object_class: str):
        pass
