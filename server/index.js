const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");

const io = require("socket.io")(server, {
	cors: {
		origin: "*",
		methods: [ "GET", "POST" ]
	}
});

app.use(cors());

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