db = new Mongo().getDB('location')
db.createCollection('location')

db.user.insertMany([
    {
        id: "room-1",
        description: "Room 1"
    },
])
