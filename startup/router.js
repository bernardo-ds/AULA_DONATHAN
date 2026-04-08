const express = require('express');
const personRoutes = require('../src/routes/person');
const Jogosonline = require('../src/routes/Jogosonline');

module.exports = (app) => {
    app.use(express.json());
    app
        .use('/api', personRoutes)
        .use('/jogos', Jogosonline)
};
