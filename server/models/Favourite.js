const mongoose = require('mongoose');

const FavouriteSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    overview: {
        type: String,
        required: true,
        trim: true
    },
    vote_average: {
        type: String,
        required: false,
    },
    release_date: {
        type: Date,
        required: false,        
    },
    backdrop_path: {
        type: String,
        required: false,
    },
    imdb_id: {
        type: Number,
        required: false,
    },
});

module.exports = mongoose.model('Favourite', FavouriteSchema);