import { logLevel } from 'kafkajs'

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

  const hostPrefix: string = process.env.NODE_ENV == 'develop' ? 'KAFKA_EXTERNAL_HOST' : 'KAFKA_HOST'
  const portPrefix: string = process.env.NODE_ENV == 'develop' ? 'KAFKA_EXTERNAL_PORT' : 'KAFKA_PORT'

  if (process.env.NODE_ENV == 'develop') {
    console.log('INFO: KAFKA DEVELOPMENT MODE')
  }

  for (const variable of Object.keys(process.env)) {
    if (variable.startsWith(hostPrefix)) {
      brokerHosts.push(process.env[variable]!)
    } else if (variable.startsWith(portPrefix)) {
      brokerPorts.push(process.env[variable]!)
    }
  }

  if (brokerHosts.length != brokerPorts.length) {
    throw new Error('Invalid configuration for Kafka brokers')
  }

  return brokerHosts.map((host: string, index: number): KafkaBroker => {
    return { host: host, port: brokerPorts[index] }
  })
}

/**
 * Returns the log level based on the environment configuration
 * @return logLevel
 */
export const getLogLevel = (): logLevel => {
  let level: logLevel = logLevel.INFO
  if (process.env.NODE_ENV == 'test' || process.env.NODE_ENV == 'production') {
    level = logLevel.WARN
  } else if (process.env.NODE_ENV == 'develop') {
    level = logLevel.INFO
  }
  return level
}
