db = new Mongo().getDB('alarm')

db.createCollection('anomaly')

db.anomaly.insert([
  {
    _id: ObjectId('65b514200718dbb3580fb9e6'),
    deviceId: {
      type: 'SENSOR',
      code: 'sen-01'
    },
    timestamp: new Date('2024-01-27T15:32:15.925Z'),
    value: 30,
    measure: 'PRESSURE',
    __v: 0
  },
  {
    _id: ObjectId('65b514240718dbb3580fb9e8'),
    deviceId: {
      type: 'CAMERA',
      code: 'cam-01'
    },
    timestamp: new Date('2024-01-27T16:32:15.925Z'),
    intrusionObject: 'ANIMAL',
    __v: 0
  }
])

db.createCollection('securityRule')
db.securityRule.insert([
  {
    _id: ObjectId('65b527590fa38e9a5422537c'),
    deviceId: {
      type: 'SENSOR',
      code: 'sen-01'
    },
    creatorId: ObjectId('aaaaaaaaaaaaaaaaaaaaaaaa'),
    description: 'Exceeding rule description',
    min: 0,
    max: 20,
    measure: 'TEMPERATURE',
    contactsToNotify: [
      {
        type: 'SMS',
        value: '3333333333'
      },
      {
        type: 'EMAIL',
        value: 'letsdothis.shared@gmail.com'
      }
    ],
    from: new Date('2020-01-01T01:00:00.000Z'),
    to: new Date('2030-01-01T22:00:00.000Z'),
    __v: 0
  },
  {
    _id: ObjectId('65b52e53cffd8e469604ef10'),
    deviceId: {
      type: 'CAMERA',
      code: 'cam-01'
    },
    creatorId: ObjectId('aaaaaaaaaaaaaaaaaaaaaaaa'),
    description: 'Intrusion rule description',
    objectClass: 'PERSON',
    contactsToNotify: [
      {
        type: 'SMS',
        value: '3333333333'
      },
      {
        type: 'EMAIL',
        value: 'letsdothis.shared@gmail.com'
      }
    ],
    from: new Date('2020-01-01T01:00:00.000Z'),
    to: new Date('2030-01-01T22:00:00.000Z'),
    __v: 0
  }
])

db.createCollection('recognizingNode')

db.recognizingNode.insert([
  {
    _id: ObjectId('65a020d5de7178fe501e7dda'),
    ipAddress: '192.168.1.2',
    deviceIds: [
      {
        type: 'CAMERA',
        code: 'cam-01'
      },
      {
        type: 'SENSOR',
        code: 'sen-01'
      }
    ],
    __v: 0
  },
  {
    _id: ObjectId('65a020d5de7178fe501e7ddb'),
    ipAddress: '192.168.1.2',
    deviceIds: [
      {
        type: 'CAMERA',
        code: 'cam-02'
      },
      {
        type: 'SENSOR',
        code: 'sen-02'
      }
    ],
    __v: 0
  }
])
