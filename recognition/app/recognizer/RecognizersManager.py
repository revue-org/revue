from concurrent.futures import ThreadPoolExecutor

from app.recognizer.Recognizer import Recognizer


class RecognizersManager:

    def __init__(self):
        self._executor = ThreadPoolExecutor()
        self.recognizers: dict = {}  # {camera_code: Recognizer}

    def add_object_to_recognize(self, object_class: str, camera_code: str):
        """
        Add an object to recognize to a camera. If it's the first object for that camera, it creates a new Recognizer.
        If the camera already has a Recognizer, it adds the object to that Recognizer.
        If the object is already being recognized, it does nothing.
        :param object_class: Object to recognize
        :param camera_code: camera code on which to recognize the object
        """
        if camera_code not in self.recognizers:
            rtsp_stream_url: str = f"rtsp://localhost:8554/{camera_code}"
            self.recognizers[camera_code] = Recognizer(rtsp_stream_url, [object_class])
            self._executor.submit(self.recognizers[camera_code].start_recognizing)
        else:
            if object_class not in self.recognizers[camera_code].objects_to_recognize:
                self.recognizers[camera_code].objects_to_recognize.append(object_class)

    def remove_object_to_recognize(self, object_class: str, camera_code: str):
        """
        Remove an object to recognize from a camera. If the camera has no more objects to recognize, it stops recognizing.
        If parameters are invalid, it does nothing.
        :param object_class:
        :param camera_code:
        :return:
        """
        if (
            camera_code in self.recognizers
            and object_class in self.recognizers[camera_code].objects_to_recognize
        ):
            self.recognizers[camera_code].objects_to_recognize.remove(object_class)
            if len(self.recognizers[camera_code].objects_to_recognize) == 0:
                self.recognizers[camera_code].stop_recognizing()
                self.recognizers.pop(camera_code)

    def remove_all_objects_to_recognize(self):
        for camera_code in self.recognizers:
            self.recognizers[camera_code].stop_recognizing()
        self.recognizers.clear()
