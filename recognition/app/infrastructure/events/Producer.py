import json

from kafka3 import KafkaProducer

from app.utils.Logger import logger
from app.utils.env import KAFKA_HOST, KAFKA_PORT, ENV


class Producer:

    def __init__(self):
        if ENV != "test":
            logger.info(f"Connecting to Kafka at {KAFKA_HOST}:{KAFKA_PORT}")
            self._producer = KafkaProducer(
                bootstrap_servers=f"{KAFKA_HOST}:{KAFKA_PORT}"
            )

    def produce(self, topic: str, message: dict):
        self._producer.send(topic, json.dumps(message).encode("utf-8"))
