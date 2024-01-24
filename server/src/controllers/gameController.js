// controllers/gameController.js

const generateRandomCode = require('../utils/randomCode');

// In-memory store for sessions (can be replaced with a database)
let sessions = {};
let recentSessionCode = null; // Variable to keep track of the most recent session code

const createSession = (req, res) => {
    const sessionCode = generateRandomCode();
    sessions[sessionCode] = {
        players: [],
        gameState: 'waiting', // initial state
        // Additional game properties
    };

    recentSessionCode = sessionCode;

    res.status(200).json({
        message: 'Game session created successfully',
        sessionCode
    });
};

const getRecentSession = (req, res) => {
    if (recentSessionCode && sessions[recentSessionCode]) {
        res.status(200).json({
            message: 'Recent session code fetched successfully',
            sessionCode: recentSessionCode,
            session: sessions[recentSessionCode]
        });
    } else {
        res.status(404).json({ message: 'No active sessions found' });
    }
};

const joinSession = (req, res) => {
    const { sessionCode, playerName } = req.body;
    if (sessions[sessionCode]) {
        // Assign a number based on the order of joining
        const playerNumber = sessions[sessionCode].players.length + 1;
        sessions[sessionCode].players.push({ name: playerName, number: playerNumber });

        res.status(200).json({
            message: 'Joined the session successfully',
            session: sessions[sessionCode]
        });
    } else {
        res.status(404).json({ message: 'Session not found' });
    }
};

const getSessionDetails = (req, res) => {
    const { sessionCode } = req.params;
    if (sessions[sessionCode]) {
        res.status(200).json({
            message: 'Session details fetched successfully',
            session: sessions[sessionCode]
        });
    } else {
        res.status(404).json({ message: 'Session not found' });
    }
};



// Additional game logic functions

module.exports = {
    createSession,
    joinSession,
    getSessionDetails,
    getRecentSession
    // Export other functions as needed
};
