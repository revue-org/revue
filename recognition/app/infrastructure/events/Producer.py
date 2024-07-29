import json
from datetime import datetime

from app.utils.Logger import logger
from app.utils.env import KAFKA_HOST, KAFKA_PORT, ENV
from kafka3 import KafkaProducer


class Producer:

    def __init__(self):
        if ENV != "test":
            logger.info(f"Connecting to Kafka at {KAFKA_HOST}:{KAFKA_PORT}")
            self._producer = KafkaProducer(bootstrap_servers=f"{KAFKA_HOST}:{KAFKA_PORT}")

    def produce(self, topic: str, recognized_object: str):
        self._producer.send(
            topic,
            json.dumps(
                {
                    "objectClass": recognized_object,
                    "timestamp": datetime.now().isoformat(),
                }
            ).encode("utf-8"),
        )
