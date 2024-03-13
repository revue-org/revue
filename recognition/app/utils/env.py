import os
from os.path import join, dirname

from dotenv import load_dotenv

dotenv_path = join(dirname(__file__), "../../.env")
load_dotenv(dotenv_path)
ALARM_PORT = os.environ.get("ALARM_PORT")
ALARM_HOST = "localhost"  # os.environ.get("ALARM_HOST")
KAFKA_HOST = os.environ.get("KAFKA_HOST")
KAFKA_PORT = os.environ.get("KAFKA_PORT")
DEV_API_KEY = os.environ.get("DEV_API_KEY")
