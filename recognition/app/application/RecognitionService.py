from abc import ABC, abstractmethod


class RecognitionService(ABC):

    @abstractmethod
    def start_recognizing(self, camera_code: str) -> None:
        """
        It starts to recognize the video stream produced by a camera.
        If it is already recognizing the camera, it does nothing.
        :param camera_code: the camera code of the camera to start recognizing
        """
        pass

    @abstractmethod
    def stop_recognizing(self, camera_code: str) -> None:
        """
        It stops recognizing the video stream produced by a camera.
        If it is not recognizing the camera, it does nothing.
        :param camera_code: the camera code of the camera to stop recognizing
        """
        pass

    @abstractmethod
    def stop_all_recognizing(self):
        """
        It stops recognizing the video stream produced by all cameras.
        """
        pass
