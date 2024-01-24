// server.js
const app = require('./app');
const http = require('http');
const socketIo = require('socket.io');

const PORT = process.env.PORT || 4000;
const server = http.createServer(app);

const io = socketIo(server, {
    cors: {
        origin: "*", // Accept connections from all origins
        methods: ["GET", "POST"] // Accept these HTTP methods
    }
});

require('./socket')(io);
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
