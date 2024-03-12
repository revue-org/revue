import os

import cv2 as cv
import numpy as np


class Recognizer:

    def __init__(self, rtsp_stream_url: str, objects_to_recognize: [str]):
        yolo_resource: str = "app/resources/yolov3"
        with open(f"{yolo_resource}/coco.names", "r") as f:
            self.classes: [str] = [line.strip() for line in f.readlines()]
        self._rtsp_stream_url: str = rtsp_stream_url
        self._objects_to_recognize: str = objects_to_recognize
        self._is_recognizing: bool = False
        self._net = cv.dnn_DetectionModel(
            f"{yolo_resource}/yolov3.weights", f"{yolo_resource}/yolov3.cfg"
        )
        self._net.setInputSize(320, 320)
        self._net.setInputScale(1.0 / 255)
        self._net.setInputSwapRB(True)

    @property
    def objects_to_recognize(self) -> str:
        return self._objects_to_recognize

    @objects_to_recognize.setter
    def objects_to_recognize(self, objects_to_recognize: str):
        self._objects_to_recognize = objects_to_recognize

    def start_recognizing(self) -> None:
        os.environ["OPENCV_FFMPEG_CAPTURE_OPTIONS"] = "rtsp_transport;tcp"

        # load capture
        capture = cv.VideoCapture(self._rtsp_stream_url, cv.CAP_FFMPEG)
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
                    if self.classes[classId] in self._objects_to_recognize:
                        pass

        capture.release()

    def stop_recognizing(self) -> None:
        self._is_recognizing = False

    def is_recognizing(self) -> bool:
        return self._is_recognizing
