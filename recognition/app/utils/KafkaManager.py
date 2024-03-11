# from typing import List
#
# from kafka import KafkaProducer
#
#
# class KafkaManager:
#     def __init__(self, kafka_broker):
#         self.kafka_broker = kafka_broker
#         self.producers: List[KafkaProducer] = []
#
#     def create_producer(self):
#         self.producers.append(KafkaProducer(bootstrap_servers=self.kafka_broker))
#
#     def get_producer(self,
