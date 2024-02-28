const express = require('express');
const http = require('http');

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

app.use(express.static("public"));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
})

let connectedPeers = [];

io.on('connection', (socket) => {
    console.log('user Connected');
    console.log(socket.id);
    connectedPeers.push(socket.id);

    socket.on("disconnect", () => {
        console.log("user disconnected");
        console.log(socket.id);
        connectedPeers = connectedPeers.filter(peerId => peerId != socket.id);
    })
})

server.listen(PORT, () => {
    console.log(`listening on localhost:${PORT}`);
})