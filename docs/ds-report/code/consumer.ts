const consumer: Consumer = kafkaManager.createConsumer('alarmConsumer')

export const setupConsumer = async (): Promise<void> => {
  await consumer.connect()
  await consumer.subscribe({ topics: await getTopics(), fromBeginning: false })
  consumer
    .run({
      eachMessage: async ({ topic, message }): Promise<void> => {
        // message arrived!
      }
    })
    .then(() => console.log('Consumer running'))
}
