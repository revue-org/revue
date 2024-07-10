db = new Mongo().getDB('user')
db.createCollection('user')

db.user.insertMany([
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
