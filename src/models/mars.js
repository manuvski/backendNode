const mongoose = require('mongoose')

const marsSchema = new mongoose.Schema({
    nasaId: {
        type: Number,
        required: true
    },

    sol: {
        type: Number,
    },

    image: {
        type: String,   
    }

});

const Mars = mongoose.model("Mars", marsSchema)

module.exports = Mars

