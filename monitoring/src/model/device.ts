import mongoose, {Schema} from "mongoose";

const DeviceSchema = new Schema({
    title:  String, // String is shorthand for {type: String}
    year: Number,
    rated: String,
    released: Date,
    runtime: Number,
    countries: [String],
    genres: [String],
    director: String,
    writers: [String],
    actors: [String],
    plot: String,
    poster: String,
    imdb: {
        id: String,
        rating: Number,
        votes: Number
    },
    awards: {
        wins: Number,
        nominations: Number,
        text: String
    },
    type: String,
});


export const deviceModel = mongoose.model('Device', DeviceSchema);
