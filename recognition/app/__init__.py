import logging
import os
import threading
from concurrent.futures import ThreadPoolExecutor
from os.path import join, dirname

import requests
from dotenv import load_dotenv
from flask import Flask

from app.Recognizer import Recognizer

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger('recognition')

dotenv_path = join(dirname(__file__), '../../.env')
load_dotenv(dotenv_path)
ALARM_PORT = os.environ.get("ALARM_PORT")
ALARM_HOST = 'localhost'# os.environ.get("ALARM_HOST")
DEV_API_KEY = os.environ.get("DEV_API_KEY")
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

    url = f'http://{ALARM_HOST}:{ALARM_PORT}/security-rules/intrusions'
    headers = {'Authorization': f'Bearer {DEV_API_KEY}'}
    logger.info(url)
    logger.info(headers)
    r = requests.get(url, headers=headers)
    logger.info(r.json())

    @app.route("/")
    def hello_world():
        rtsp_stream_url = "rtsp://localhost:8554/mystream"
        object_to_recognize = ['person']
        recognizer = Recognizer(rtsp_stream_url, object_to_recognize)
        executor.submit(recognizer.start_recognizing)
        set_interval(recognizer.stop_recognizing, 10)
        return "<p>Hello, World!</p>"

    return app
