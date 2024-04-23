from concurrent.futures import ThreadPoolExecutor

from app.recognizer.Recognizer import Recognizer
from app.utils.env import MEDIA_SERVER_HOST, MEDIA_SERVER_RTSP_PORT


class RecognizersManager:

    def __init__(self):
        self._executor = ThreadPoolExecutor()
        self.recognizers: dict = {}  # {camera_code: Recognizer}

    def add_camera(self, camera_code: str):
        """
        It creates a Recognizer starting to recognize the video of a camera.
        If the camera already has a Recognizer, it does nothing.
        :param camera_code: the camera code of the camera to add
        """
        if camera_code not in self.recognizers:
            rtsp_stream_url: str = (
                f"rtsp://{MEDIA_SERVER_HOST}:{MEDIA_SERVER_RTSP_PORT}/{camera_code}/stream"
            )
            self.recognizers[camera_code] = Recognizer(camera_code, rtsp_stream_url)
            self._executor.submit(self.recognizers[camera_code].start_recognizing)

    def remove_camera(self, camera_code: str):
        """
        Remove the Recognizer of a camera.
        If the camera does not have a Recognizer, it does nothing.
        :param camera_code: the camera code of the camera to remove
        """
        if camera_code in self.recognizers:
            self.recognizers[camera_code].stop_recognizing()
            self.recognizers.pop(camera_code)

    def remove_all_cameras(self):
        for camera_code in self.recognizers:
            self.recognizers[camera_code].stop_recognizing()
        self.recognizers.clear()
