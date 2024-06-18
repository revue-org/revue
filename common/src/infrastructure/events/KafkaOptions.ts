export type KafkaOptions = {
  clientId: string
  brokers: [
    {
      host: string
      port: string
    }
  ]
  groupId?: string
}
