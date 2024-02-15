db = new Mongo().getDB('log')

db.createCollection('environmentData')

db.environmentData.insert([
  {
    _id: ObjectId('65b514200718dbb3580fb900'),
    deviceId: {
      type: 'SENSOR',
      code: 'sen-01'
    },
    value: 50,
    measure: 'TEMPERATURE',
    timestamp: new Date('2024-01-27T15:32:15.925Z'),
    __v: 0
  },
  {
    _id: ObjectId('65b514200718dbb3580fb901'),
    deviceId: {
      type: 'SENSOR',
      code: 'sen-01'
    },
    value: 100,
    measure: 'TEMPERATURE',
    timestamp: new Date('2024-01-27T15:32:15.925Z'),
    __v: 0
  },
  {
    _id: ObjectId('65b514200718dbb3580fb902'),
    deviceId: {
      type: 'SENSOR',
      code: 'sen-02'
    },
    value: 20,
    measure: 'PRESSURE',
    timestamp: new Date('2024-01-27T15:32:15.925Z'),
    __v: 0
  },
  {
    _id: ObjectId('65b514200718dbb3580fb903'),
    deviceId: {
      type: 'SENSOR',
      code: 'sen-02'
    },
    value: 50,
    measure: 'HUMIDITY',
    timestamp: new Date('2024-01-27T15:32:15.925Z'),
    __v: 0
  }
])
