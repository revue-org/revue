db = new Mongo().getDB('auth')

db.createCollection('user')
//TODO to test
db.user.insert([
  {
    _id: {
      $oid: '6582b78ee645d6402a3be6e2'
    },
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
