db = new Mongo().getDB('alarm')

db.createCollection('anomaly')

db.anomaly.insert([
  {
    _id: {
      $oid: '65b514200718dbb3580fb9e6'
    },
    deviceId: {
      type: 'SENSOR',
      code: 'sen-01'
    },
    timestamp: {
      $date: '2024-01-27T14:33:04.604Z'
    },
    value: 30,
    measure: 'PRESSURE',
    __v: 0
  },
  {
    _id: {
      $oid: '65b514240718dbb3580fb9e8'
    },
    deviceId: {
      type: 'CAMERA',
      code: 'cam-03'
    },
    timestamp: {
      $date: '2024-01-27T14:33:08.295Z'
    },
    intrusionObject: 'ANIMAL',
    __v: 0
  }
])

db.createCollection('notification')

db.notification.insert([
  {
    _id: {
      $oid: '65b5113633b1c7e038248937'
    },
    anomalyId: {
      $oid: '65b514200718dbb3580fb9e6'
    },
    anomalyType: 'EXCEEDING',
    timestamp: {
      $date: '2024-01-27T14:20:38.950Z'
    },
    __v: 0
  },
  {
    _id: {
      $oid: '65b513ef0718dbb3580fb9e3'
    },
    anomalyId: {
      $oid: '65b514240718dbb3580fb9e8'
    },
    anomalyType: 'INTRUSION',
    timestamp: {
      $date: '2024-01-27T14:32:15.925Z'
    },
    __v: 0
  }
])
