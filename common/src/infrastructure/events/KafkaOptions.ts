export type KafkaBroker = {
  host: string
  port: string
}

export type KafkaOptions = {
  clientId: string
  brokers: KafkaBroker[]
  groupId?: string
}

/**
 * Creates Kafka Options starting from the environment variables
 * @return KafkaOptions
 * @throws Error if the configuration is invalid
 */
export const getBrokersFromEnv = (): KafkaBroker[] => {
  const brokerHosts: string[] = []
  const brokerPorts: string[] = []
  if (process.env.NODE_ENV == 'develop') {
    console.log('INFO: KAFKA DEVELOPMENT MODE')
    brokerHosts.push(process.env.KAFKA_EXTERNAL_HOST!)
    brokerPorts.push(process.env.KAFKA_EXTERNAL_PORT!)
  } else {
    for (const variable of Object.keys(process.env)) {
      if (variable.startsWith('KAFKA_HOST')) {
        brokerHosts.push(process.env[variable]!)
      } else if (variable.startsWith('KAFKA_PORT')) {
        brokerPorts.push(process.env[variable]!)
      }
    }
    if (brokerHosts.length != brokerPorts.length) {
      throw new Error('Invalid configuration for Kafka brokers')
    }
  }
  return brokerHosts.map((host: string, index: number): KafkaBroker => {
    return { host: host, port: brokerPorts[index] }
  })
}
