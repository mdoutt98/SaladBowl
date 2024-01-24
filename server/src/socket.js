// socket.js

module.exports = (io) => {
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
            // Clean up any listeners or leave rooms if necessary
        });
    });
};

