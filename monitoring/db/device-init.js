db = new Mongo().getDB('monitoring')

db.createCollection('device')

db.device.insert([{
  '_id': {
    'type': 'SENSOR',
    'code': 'sen-01'
  },
  'ipAddress': '192.168.1.10',
  'intervalMillis': 1000,
  'measures': [
    'PRESSURE',
    'TEMPERATURE',
    'HUMIDITY'
  ],
  '__v': 0
}, {
  '_id': {
    'type': 'CAMERA',
    'code': 'cam-01'
  },
  'ipAddress': '192.168.1.20',
  'resolution': {
    'height': 200,
    'width': 200
  },
  '__v': 0
}])
