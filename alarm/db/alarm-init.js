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

db.createCollection('securityRule')
db.securityRule.insert([
  {
    _id: {
      $oid: '65b527590fa38e9a5422537c'
    },
    deviceId: {
      type: 'SENSOR',
      code: 'sen-01'
    },
    creatorId: {
      $oid: '6582b78ee645d6402a3be6e2' // qui andra messo l'id dell'utente inserito nello script di auth db
    },
    description: 'Exceeding rule description',
    minValue: 0,
    maxValue: 25,
    measure: 'TEMPERATURE',
    contacts: [
      {
        type: 'SMS',
        value: '3333333333',
        _id: {
          $oid: '65b527590fa38e9a5422537d'
        }
      },
      {
        type: 'EMAIL',
        value: 'email@gmail.com',
        _id: {
          $oid: '65b527590fa38e9a5422537e'
        }
      }
    ],
    from: {
      $date: '2018-01-01T01:00:00.000Z'
    },
    to: {
      $date: '2020-01-01T01:00:00.000Z'
    },
    __v: 0
  },
  {
    _id: {
      $oid: '65b52e53cffd8e469604ef10'
    },
    deviceId: {
      type: 'CAMERA',
      code: 'cam-01'
    },
    creatorId: {
      $oid: '6582b78ee645d6402a3be6e2'
    },
    description: 'Intrusion rule description',
    objectClass: 'PERSON',
    contacts: [
      {
        type: 'SMS',
        value: '3333333333',
        _id: {
          $oid: '65b52e53cffd8e469604ef11'
        }
      },
      {
        type: 'EMAIL',
        value: 'email@gmail.com',
        _id: {
          $oid: '65b52e53cffd8e469604ef12'
        }
      }
    ],
    from: {
      $date: '2018-01-01T01:00:00.000Z'
    },
    to: {
      $date: '2020-01-01T01:00:00.000Z'
    },
    __v: 0
  }
])
