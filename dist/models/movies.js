"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Define the schema using the interface
const movieSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    Released: { type: String, required: true },
    year: { type: Number, required: true },
    rated: { type: String, required: false },
    Runtime: { type: Number, required: false },
    Genre: { type: [String], required: false },
    director: { type: String, required: false },
    Language: { type: String, required: false },
    Plot: { type: String, required: false },
    poster: { type: String, required: false },
    metascore: { type: Number, required: false },
    imdbRating: { type: Number, required: false },
    imdbVotes: { type: String, required: false },
    imdbID: { type: String, required: false },
});
// Export the model with the appropriate type
const Movie = (0, mongoose_1.model)("Movie", movieSchema);
exports.default = Movie;
