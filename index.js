console.log('Servidor Levantado');

const path = require('path');
const express = require('express');
const app = express();

// settings
app.set( 'port', process.env.PORT || 3000 || 'https://socketio-server-production-2e07.up.railway.app/' );

// static files
app.use(express.static(path.join(__dirname, 'public')));

// start the server
const server = app.listen(app.get('port'), () => {
    console.log('servidor en puerto', app.get('port'));
});

const SocketIO = require('socket.io');
const io = SocketIO(server);

// websockets
io.on('connection', (socket) => {
    console.log('New connection', socket.id);

    socket.on('chat:message', (data) => {
        io.sockets.emit('chat:message', data);
    })

    socket.on('chat:typing', (data) => {
        socket.broadcast.emit('chat:typing', data);
    })
});

