// routes/wordRoutes.js

const express = require('express');
const wordController = require('../controllers/wordController');

const router = express.Router();

router.get('/', wordController.getWords);

module.exports = router;
