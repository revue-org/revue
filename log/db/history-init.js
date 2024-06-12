db = new Mongo().getDB('log')

db.createCollection('measurement')
db.createCollection('anomaly')

