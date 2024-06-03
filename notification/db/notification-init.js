db = new Mongo().getDB("notification");

db.createCollection("notification");

db.notification.insert([]);
