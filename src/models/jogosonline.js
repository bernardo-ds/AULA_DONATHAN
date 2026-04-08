const mongoose = require('mongoose');

const Jogos = mongoose.model('Jogos', {
    title: String,
    genre: String,
    platform: String
});

module.exports = Jogos;