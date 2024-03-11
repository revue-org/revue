db = new Mongo().getDB("notification");

db.createCollection("notification");

db.notification.insert([
  {
    _id: ObjectId("65b5113633b1c7e038248937"),
    anomalyId: ObjectId("65b514200718dbb3580fb9e6"),
    anomalyType: "EXCEEDING",
    timestamp: new Date("2024-01-27T14:32:15.925Z"),
    __v: 0
  },
  {
    _id: ObjectId("65b513ef0718dbb3580fb9e3"),
    anomalyId: ObjectId("65b514240718dbb3580fb9e8"),
    anomalyType: "INTRUSION",
    timestamp: new Date("2024-01-27T14:32:15.925Z"),
    __v: 0
  }
]);
