// routes/gameRoutes.js

const express = require('express');
const gameController = require('../controllers/gameController');

const router = express.Router();

router.post('/create', gameController.createSession);
router.post('/join', gameController.joinSession);

// Additional routes

module.exports = router;
