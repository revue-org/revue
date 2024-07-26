from abc import ABC, abstractmethod


class RecognitionEventsHub(ABC):

    @abstractmethod
    def publish_detection(self, camera_code: str, object_class: str):
        pass

