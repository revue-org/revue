db = new Mongo().getDB('device')

db.createCollection('device')

db.device.insert([])
