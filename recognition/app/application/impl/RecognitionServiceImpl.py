from concurrent.futures import ThreadPoolExecutor
from typing import Set

from app.application import RecognitionService, RecognitionEventsHub, Recognizer
from app.utils.Logger import logger
from app.utils.env import MEDIA_SERVER_HOST, MEDIA_SERVER_RTSP_PORT


class RecognitionServiceImpl(RecognitionService):

    def __init__(self, events_hub: RecognitionEventsHub):
        self._events = events_hub
        self._executor = ThreadPoolExecutor()
        self.recognizers: Set[Recognizer] = set()

    def start_recognizing(self, camera_code: str):
        """
        It starts to recognize the video stream produced by a camera.
        If it is already recognizing the camera, it does nothing.
        :param camera_code: the camera code of the camera to start recognizing
        """
        if camera_code not in list(map(lambda r: r.camera_code, self.recognizers)):

            def publish_detection(object_class: str):
                logger.info(f"Detected {object_class} in camera {camera_code}")
                self._events.publish_detection(camera_code, object_class)

            rtsp_stream_url: str = (
                f"rtsp://{MEDIA_SERVER_HOST}:{MEDIA_SERVER_RTSP_PORT}/{camera_code}/stream"
            )
            recognizer = Recognizer(camera_code, rtsp_stream_url)
            self._executor.submit(recognizer.start_recognizing, publish_detection)
            self.recognizers.add(recognizer)

    def stop_recognizing(self, camera_code: str):
        """
        It stops recognizing the video stream produced by a camera.
        If it is not recognizing the camera, it does nothing.
        :param camera_code: the camera code of the camera to stop recognizing
        """
        if camera_code in list(map(lambda r: r.camera_code, self.recognizers)):
            recognizer = next(
                filter(lambda r: r.camera_code == camera_code, self.recognizers)
            )
            recognizer.stop_recognizing()
            self.recognizers.remove(recognizer)

    def stop_all_recognizing(self):
        """
        It stops recognizing the video stream produced by all cameras.
        """
        for recognizer in self.recognizers:
            recognizer.stop_recognizing()
        self.recognizers.clear()
