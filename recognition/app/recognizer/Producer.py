import json

from kafka import KafkaProducer

from app.utils.env import KAFKA_HOST, KAFKA_PORT


class Producer:

    def __init__(self):
        self._producer = KafkaProducer(bootstrap_servers=f"{KAFKA_HOST}:{KAFKA_PORT}")

    def produce(self, topic: str, recognized_object: str):
        self._producer.send(
            topic, json.dumps({"value": recognized_object}).encode("utf-8")
        )
