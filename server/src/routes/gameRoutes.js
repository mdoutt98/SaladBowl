// routes/gameRoutes.js

const express = require('express');
const gameController = require('../controllers/gameController');

const router = express.Router();

router.post('/create', gameController.createSession);
router.post('/join', gameController.joinSession);
router.get('/recent', gameController.getRecentSession); // Route to get the most recent session
router.get('/session/:sessionCode', gameController.getSessionDetails);
// Additional routes

module.exports = router;
