db = new Mongo().getDB('auth')
db.createCollection('user')