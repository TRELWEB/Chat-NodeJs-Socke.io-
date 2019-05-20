const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io').listen(http);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
});

io.emit('some event', {for: 'everyone'});

io.on('connection', function (socket) {
    socket.broadcast.emit('hi');
    socket.on('chat message', function (msg) {
        io.emit('Chat message: ' + msg);
    });
    socket.on('disconnect', function () {
        console.log('Usuario desconectado');
    });
});

http.listen(9091, function () {
    console.log('listening on *:9091');
});