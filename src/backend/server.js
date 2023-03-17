// import { io } from "socket.io-client";

// export const socket = io("http://localhost:3000");

const app = require('express')();
const server = require('http').createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
// });

io.on('connection', socket => {
    console.log('joined');
    socket.on('op', op => {
        io.emit('op', op);
        console.log(op);
    });
    socket.on('disconnect', () => {
        console.log('left');
    });
})

server.listen('3000', () => 'server start')
