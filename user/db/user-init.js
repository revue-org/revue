db = new Mongo().getDB('user')
db.createCollection('user')

db.user.insertMany([
  {
    id: 'id-admin',
    name: 'Mario',
    surname: 'Rossi',
    mail: 'admin@test.it',
    contacts: [
      {
        type: 'sms',
        value: '3333333333'
      },
      {
        type: 'email',
        value: 'admin@test.it'
      }
    ]
  },
  {
    id: 'id-1',
    name: 'John',
    surname: 'Doe',
    mail: 'test@test.it',
    contacts: [
      {
        type: 'sms',
        value: '1234567890'
      },
      {
        type: 'email',
        value: 'test@test.it'
      }
    ]
  }
])
