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
    timestamp: new Date('2024-01-27T16:32:15.925Z'),
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
    timestamp: new Date('2024-01-27T17:32:15.925Z'),
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
    timestamp: new Date('2024-01-27T18:32:15.925Z'),
    __v: 0
  }
])

db.createCollection('detection')

db.detection.insert([
  {
    _id: ObjectId('65b514200718dbb3580fb904'),
    deviceId: {
      type: 'CAMERA',
      code: 'cam-01'
    },
    intrusionObject: 'PERSON',
    timestamp: new Date('2024-01-27T15:42:15.925Z'),
    __v: 0
  },
  {
    _id: ObjectId('65b514200718dbb3580fb905'),
    deviceId: {
      type: 'CAMERA',
      code: 'cam-01'
    },
    intrusionObject: 'VEHICLE',
    timestamp: new Date('2024-01-27T17:42:15.925Z'),
    __v: 0
  },
  {
    _id: ObjectId('65b514200718dbb3580fb906'),
    deviceId: {
      type: 'CAMERA',
      code: 'cam-02'
    },
    intrusionObject: 'ANIMAL',
    timestamp: new Date('2024-01-27T16:42:15.925Z'),
    __v: 0
  }
])
