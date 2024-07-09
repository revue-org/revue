// import { KafkaBroker, KafkaOptions } from '@common/infrastructure/events/KafkaOptions'
// import { getBrokersFromEnv } from '@common/infrastructure/events/KafkaOptions.js'
// import { MonitoringEventsHubImpl } from '@/infrastructure/events/MonitoringEventsHubImpl.js'
// import { MonitoringService } from '@/application/services/MonitoringService'
// import { MonitoringServiceImpl } from '@/application/services/impl/MonitoringServiceImpl.js'
// import { MonitoringEventsHub } from '@/application/services/MonitoringEventsHub'
// import { KafkaMonitoringEventsHub } from '@/infrastructure/events/kafka/KafkaMonitoringEventsHub'
// import { SocketMonitoringEventsHub } from '@/infrastructure/events/socket/SocketMonitoringEventsHub'
// import { server } from '@/index.js'
//
// const brokers: KafkaBroker[] = getBrokersFromEnv()
//
// const kafkaOptions: KafkaOptions = {
//   clientId: 'monitoring',
//   brokers: brokers,
//   groupId: 'monitoringConsumer'
// }
//
// const kafkaMonitoring = new KafkaMonitoringEventsHub(kafkaOptions)
// const socketMonitoring = new SocketMonitoringEventsHub(server)
// const monitoringEventsHub: MonitoringEventsHub = new MonitoringEventsHubImpl(kafkaMonitoring, socketMonitoring)
// const monitoringService: MonitoringService = new MonitoringServiceImpl(monitoringEventsHub)
