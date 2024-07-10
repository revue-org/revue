db = new Mongo().getDB('auth')
db.createCollection('user')

db.user.insertMany([
  {
    id: 'id-1',
    username: 'user',
    password: '$2a$10$fsc2lVyx5JvVtmw9s4K.UOotFj5UU7PUaAF14mcCRnXCQbcMx1VcC', // user hashed
    refreshToken: '',
    permissions: ['room-1', 'room-2']
  }
])
