from abc import ABC, abstractmethod


class RecognitionEventsHub(ABC):

    @abstractmethod
    def publish_detection(self, camera_code: str, object_class: str) -> None:
        """
        Publishes a detection event
        :param camera_code: the camera code on which the object was detected
        :param object_class: the class of the detected object
        """
        pass
