const express = require('express');
const createError = require("http-errors");
const http = require('http');
const socketIO = require('socket.io');
const { requestTime } = require("./middleware/request-time");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);  // Initialize Socket.IO with the server

const PORT = process.env.PORT || 3000;

app.use(requestTime);

const rootRoutes = require("./routes/root");
app.use("/", rootRoutes);

app.use((_req, res, next) => {
    next(createError(404));
});

io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle chat messages
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Set io, from root.js app.get()
app.set('io', io);

server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
