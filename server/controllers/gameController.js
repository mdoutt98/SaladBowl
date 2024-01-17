// controllers/gameController.js

const generateRandomCode = require('../utils/randomCode');

// In-memory store for sessions (can be replaced with a database)
let sessions = {};

const createSession = (req, res) => {
    const sessionCode = generateRandomCode();
    sessions[sessionCode] = {
        players: [],
        gameState: 'waiting', // initial state
        // Additional game properties
    };

    res.status(200).json({
        message: 'Game session created successfully',
        sessionCode
    });
};

const joinSession = (req, res) => {
    const { sessionCode, playerName } = req.body;
    if (sessions[sessionCode]) {
        sessions[sessionCode].players.push(playerName);
        res.status(200).json({
            message: 'Joined the session successfully',
            session: sessions[sessionCode]
        });
    } else {
        res.status(404).json({ message: 'Session not found' });
    }
};

// Additional game logic functions

module.exports = {
    createSession,
    joinSession
    // Export other functions as needed
};
