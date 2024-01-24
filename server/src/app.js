// app.js

const express = require('express');
const cors = require('cors');
const app = express();
const gameRoutes = require('./routes/gameRoutes');
const wordRoutes = require('./routes/wordRoutes');

app.use(cors({
    origin: '*', // You can specify domains here for security
    methods: ['GET', 'POST', 'OPTIONS'], // Make sure OPTIONS is included
    allowedHeaders: ["Content-Type", "Authorization"]
}));


app.use(express.json());
app.use('/api/game', gameRoutes);
app.use('/api/words', wordRoutes);

module.exports = app;
