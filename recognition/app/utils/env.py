import os
from os.path import join, dirname

from dotenv import load_dotenv

dotenv_path = join(dirname(__file__), "../../../.env")
load_dotenv(dotenv_path)
ALARM_HOST = "localhost"  # os.environ.get("ALARM_HOST")
ALARM_PORT = os.environ.get("ALARM_PORT")
KAFKA_HOST = "localhost"  # os.environ.get("KAFKA_HOST")
KAFKA_PORT = "9094"  # os.environ.get("KAFKA_PORT")
RECOGNITION_BEARER_TOKEN = os.environ.get("RECOGNITION_BEARER_TOKEN")
