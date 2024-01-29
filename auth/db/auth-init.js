db = new Mongo().getDB('auth')

db.createCollection('user')
//TODO to test
db.user.insertMany([
  {
    _id: ObjectId('aaaaaaaaaaaaaaaaaaaaaaaa'),
    name: 'Mattia',
    surname: 'Matteini',
    username: 'mattia',
    password: '$2a$10$QmASVIA1cy65TArhkhINte52vrNuJMlSpdO2FVLqI/OM32LmK6jHS',
    token: '',
    refreshToken: '',
    contacts: [{ type: 'SMS', value: '33344455678' }],
    deviceIds: [
      { type: 'CAMERA', code: 'cam-02' },
      { type: 'SENSOR', code: 'sen-02' }
    ]
  },
  {
    _id: ObjectId('aaaaaaaaaaaaaaaaaaaaaaab'),
    name: 'Mario',
    surname: 'Rossi',
    username: 'paga16',
    password: '$2a$10$eHwL5cAfFPqBAbQyAqH/nOK94EyttraZx/xjEwQQiQP.hyB/XT64.', //passwordprova hashed
    token: '',
    refreshToken: '',
    contact: [
      {
        value: '3333333333',
        type: 'SMS'
      }
    ],
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
    contacts: []
  }
])
