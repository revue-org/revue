import {NotificationEventsHub} from "@/application/services/NotificationEventsHub";
import {Anomaly} from "@common/domain/core";
import KafkaConsumer from "@common/infrastructure/events/KafkaConsumer"
import {KafkaOptions} from "@common/infrastructure/events/KafkaOptions";
import {KafkaMessage} from "kafkajs";

export class KafkaNotificationMessageHub implements NotificationEventsHub {
    private anomalyConsumer: KafkaConsumer

    constructor(options: KafkaOptions) {
        this.anomalyConsumer = new KafkaConsumer(options)
    }

    subscribeToAnomalies(handler: (anomaly: Anomaly) => void): void {
        this.anomalyConsumer.startConsuming(
            ["define-topic"],
            false,
            (message: KafkaMessage) => {
                if (message.value) {
                    // const anomaly: Anomaly = ...
                    // handler(anomaly)
                }
            });
    }
}
