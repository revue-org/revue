const UserSchema = new Schema({
    _id: Number,
    name: String,
    surname: String,
    contact: {
        value: String,
        type: String
    }
});