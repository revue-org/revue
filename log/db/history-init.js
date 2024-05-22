db = new Mongo().getDB('log')

db.createCollection('environmentData')

db.environmentData.insert([])
