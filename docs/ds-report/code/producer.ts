const kafka: Kafka = new Kafka({
  clientId: `SENSOR_${SENSOR_CODE}`,
  brokers: [`${kafkaHost}:${kafkaPort}`]
})

export const produce = async (): Promise<void> => {
  const producer: Producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner })
  await producer.connect()
  setInterval(async (): Promise<void> => {
    await producer.send({
      topic: `SENSOR_${sourceSensor.deviceId.code}`,
      messages: [
        {
          value: JSON.stringify(values)
        }
      ]
    })
  }, sourceSensor.intervalMillis)
}
