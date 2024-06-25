db = new Mongo().getDB('device')

db.createCollection('device')

db.device.insert([
  {
    id: 'sen-01',
    description: 'sensor 1 description',
    locationId: 'loc-01',
    endpoint: {
      ipAddress: '192.168.1.12',
      port: 9999
    },
    enabled: true,
    __v: 0
  },
  {
    id: 'cam-01',
    description: 'camera 1 description',
    locationId: 'loc-01',
    endpoint: {
      ipAddress: '192.168.1.13',
      port: 10000
    },
    enabled: true,
    __v: 0
  },
  {
    id: 'sen-02',
    description: 'sensor 2 description',
    locationId: 'loc-02',
    endpoint: {
      ipAddress: '192.168.1.14',
      port: 10001
    },
    enabled: true,
    __v: 0
  },
  {
    id: 'cam-01',
    description: 'camera 2 description',
    locationId: 'loc-02',
    endpoint: {
      ipAddress: '192.168.1.16',
      port: 10002
    },
    enabled: true,
    __v: 0
  },
])
