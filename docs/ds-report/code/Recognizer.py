class Recognizer:

    def __init__(self, camera_code: str, rtsp_stream_url: str):
        yolo_resource: str = "app/resources/yolov3"
        with open(f"{yolo_resource}/coco.names", "r") as f:
            self.classes: [str] = [line.strip() for line in f.readlines()]
        self._camera_code: str = camera_code
        self._rtsp_stream_url: str = rtsp_stream_url
        self._is_recognizing: bool = False
        self._recognized_objects: [str] = []
        self._net = cv.dnn_DetectionModel(
            f"{yolo_resource}/yolov3.weights", f"{yolo_resource}/yolov3.cfg"
        )

    def start_recognizing(self) -> None:
        os.environ["OPENCV_FFMPEG_CAPTURE_OPTIONS"] = "rtsp_transport;tcp"

        # load capture
        capture = cv.VideoCapture(self._rtsp_stream_url, cv.CAP_FFMPEG)
        capture.set(cv.CAP_PROP_FRAME_WIDTH, 640)
        capture.set(cv.CAP_PROP_FRAME_HEIGHT, 480)

        self._is_recognizing = True
        while self._is_recognizing:
            ret, frame = capture.read()
            if not ret:
                break

            # Detecting objects
            class_ids, confidences, _ = self._net.detect(frame, confThreshold=0.5)

            # ... process the detected objects and publish to Kafka

        capture.release()

    def stop_recognizing(self) -> None:
        self._is_recognizing = False

    def is_recognizing(self) -> bool:
        return self._is_recognizing
