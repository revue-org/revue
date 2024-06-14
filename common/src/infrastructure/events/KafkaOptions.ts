export type KafkaOptions = {
  clientId: string,
  brokers: [
    {
      host: string,
      port: number
    }
  ],
  groupId?: string,
}
