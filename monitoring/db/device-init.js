db = new Mongo().getDB('monitoring')

db.createCollection('device')

db.device.insert([{
  '_id': {
    'type': 'SENSOR',
    'code': 'sen-01'
  },
  'isCapturing': true,
  'ipAddress': '192.168.1.10',
  'intervalMillis': 400,
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
  'isCapturing': true,
  'ipAddress': '192.168.1.20',
  'resolution': {
    'height': 200,
    'width': 200
  },
  '__v': 0
}, {
  '_id': {
    'type': 'SENSOR',
    'code': 'sen-02'
  },
  'isCapturing': true,
  'ipAddress': '192.168.1.30',
  'intervalMillis': 300,
  'measures': [
    'HUMIDITY',
    'TEMPERATURE'
  ],
  '__v': 0
}, {
  '_id': {
    'type': 'CAMERA',
    'code': 'cam-02'
  },
  'isCapturing': true,
  'ipAddress': '192.168.1.40',
  'resolution': {
    'height': 200,
    'width': 200
  },
  '__v': 0
}])
