db = new Mongo().getDB('device')

db.createCollection('device')

db.device.insert([
  {
    id: 'thing-1',
    description: 'Revue federated device',
    locationId: 'room-1',
    endpoint: {
      ipAddress: 'localhost',
      port: 6001
    },
    isEnabled: true,
    __v: 0
  }
])
