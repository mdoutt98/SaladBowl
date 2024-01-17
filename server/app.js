// app.js

const express = require('express');
const socketIo = require('socket.io');
const gameRoutes = require('./routes/gameRoutes');
const app = express();
const server = require('http').createServer(app);
const io = socketIo(server);
const wordRoutes = require('./routes/wordRoutes');

app.use(express.json());
app.use('/api/game', gameRoutes);
app.use('/api/words', wordRoutes);

io.on('connection', socket => {
    console.log('New connection:', socket.id);

    socket.on('joinGame', (sessionCode) => {
        socket.join(sessionCode);
        // Broadcast to other players in the session
        socket.to(sessionCode).emit('playerJoined', { player: socket.id });
    });

    // Additional socket events

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

module.exports = app;
