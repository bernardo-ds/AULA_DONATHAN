const express = require('express');
const router = express.Router();
const PersonController = require('../controllers/JogosOnlineController');

router
    .get('/jogoson', PersonController.getAll)
    .post('/jogoson', PersonController.create)
    .get('/jogoson/:id', PersonController.getById)
    .put('/jogoson/:id', PersonController.update)
    .delete('/jogoson/:id', PersonController.delete)

module.exports = router;
