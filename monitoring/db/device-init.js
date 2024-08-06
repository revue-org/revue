db = new Mongo().getDB('monitoring')

db.createCollection('device')
