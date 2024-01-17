// server.js

const app = require('./app');
const http = require('http');

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const io = require('socket.io')(server);

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});