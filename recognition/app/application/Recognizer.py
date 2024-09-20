import os
from typing import Callable

import cv2 as cv
import numpy as np

from app.utils.interval import set_timeout
from app.utils.env import ENV


class Recognizer:

    def __init__(self, camera_code: str, rtsp_stream_url: str):
        yolo_resource: str = "app/resources/yolov3"
        with open(f"{yolo_resource}/coco.names", "r") as f:
            self.classes: [str] = [line.strip() for line in f.readlines()]
        self.camera_code: str = camera_code
        self.rtsp_stream_url: str = rtsp_stream_url
        self._is_recognizing: bool = False
        self._recognized_objects: [str] = []
        if ENV != "test":
            self._net = cv.dnn_DetectionModel(
                os.path.abspath(f"{yolo_resource}/yolov3.weights"), os.path.abspath(f"{yolo_resource}/yolov3.cfg")
            )
            self._net.setInputSize(320, 320)
            self._net.setInputScale(1.0 / 255)
            self._net.setInputSwapRB(True)

    def start_recognizing(self, recognition_handler: Callable[[str], None]) -> None:
        if ENV != "test":
            os.environ["OPENCV_FFMPEG_CAPTURE_OPTIONS"] = "rtsp_transport;tcp"

            # load capture
            capture = cv.VideoCapture(self.rtsp_stream_url, cv.CAP_FFMPEG)
            capture.set(cv.CAP_PROP_FRAME_WIDTH, 640)
            capture.set(cv.CAP_PROP_FRAME_HEIGHT, 480)

            self._is_recognizing = True
            # detect on stream
            while self._is_recognizing:
                ret, frame = capture.read()
                if not ret:
                    break

                # Detecting objects
                class_ids, confidences, _ = self._net.detect(frame, confThreshold=0.5)

                if len(class_ids) != 0:
                    class_ids = np.array(class_ids)
                    # remove duplicates maintaining the most confident
                    classes_unique = np.unique(class_ids, axis=0)
                    confidences_unique = []
                    for class_ in classes_unique:
                        index = confidences[np.where(class_ids == class_)].argmax()
                        confidences_unique.append(confidences[index])

                    confidences_unique = np.array(confidences_unique)
                    for classId, confidence in zip(
                        classes_unique.flatten(), confidences_unique.flatten()
                    ):
                        recognized_object: str = self.classes[classId]
                        if recognized_object not in self._recognized_objects:
                            self._recognized_objects.append(recognized_object)
                            recognition_handler(recognized_object)
                            set_timeout(
                                lambda: self._recognized_objects.remove(
                                    recognized_object
                                ),
                                seconds=60,
                            )

            capture.release()

    def stop_recognizing(self) -> None:
        self._is_recognizing = False

    def is_recognizing(self) -> bool:
        return self._is_recognizing
