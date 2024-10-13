import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ['GET', 'POST']
    }
});

app.use(cors({ origin : '*' }));

const Port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Server is Running');
});

io.on('connection', (socket) => {
    socket.emit('me', socket.id);

    socket.on('disconnect', () => {
        socket.broadcast.emit('callended');
    });

    socket.on('callUser', ({ userToCall, signalData, from, name })  => {
        io.to(userToCall).emit('callUser', { signal : signalData, from, name });
    });

    socket.on('answerCall', (data) => {
        io.to(data.to).emit('callAccepted', data.signal);
    });
});

server.listen(Port, () => console.log(`Server Listening on port : ${Port}`));