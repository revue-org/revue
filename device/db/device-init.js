db = new Mongo().getDB('device')

db.createCollection('device')

db.device.insert([
  {
    id: 'sen-01',
    description: 'sensor 1 description',
    locationId: 'room-1',
    endpoint: {
      ipAddress: 'localhost',
      port: 6001
    },
    isEnabled: true,
    __v: 0
  },
  {
    id: 'cam-01',
    description: 'camera 1 description',
    locationId: 'room-2',
    endpoint: {
      ipAddress: 'localhost',
      port: 5001
    },
    isEnabled: false,
    __v: 0
  },
  {
    id: 'sen-02',
    description: 'sensor 2 description',
    locationId: 'loc-02',
    endpoint: {
      ipAddress: 'localhost',
      port: 6002
    },
    isEnabled: false,
    __v: 0
  },
  {
    id: 'cam-02',
    description: 'camera 2 description',
    locationId: 'loc-02',
    endpoint: {
      ipAddress: 'localhost',
      port: 5002
    },
    isEnabled: false,
    __v: 0
  },
])
