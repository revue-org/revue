import threading
import time
from concurrent.futures import ThreadPoolExecutor

from flask import Flask

from app.Recognizer import Recognizer

executor = ThreadPoolExecutor()


def set_interval(func, sec) -> threading.Timer:
    def func_wrapper() -> None:
        set_interval(func, sec)
        func()

    t = threading.Timer(sec, func_wrapper)
    t.start()
    return t


def create_app():
    app = Flask(__name__)

    @app.route("/")
    def hello_world():
        rtsp_stream_url = "rtsp://localhost:8554/mystream"
        object_to_recognize = ['person']
        recognizer = Recognizer(rtsp_stream_url, object_to_recognize)
        executor.submit(recognizer.start_recognizing)
        set_interval(recognizer.stop_recognizing, 10)
        return "<p>Hello, World!</p>"

    return app
