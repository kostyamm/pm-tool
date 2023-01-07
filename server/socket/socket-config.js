const { roomHandler } = require('./handlers/roomHandler')

const SOCKET_OPTIONS = {
    cors: {
        origin: process.env.FRONTEND_URL,
        methods: ['GET', 'POST'],
        allowedHeaders: ['*'],
        credentials: false,
    },
}

const onConnection = (io, socket) => {
    const { roomId, userId, userName } = socket.handshake.query

    socket.roomId = roomId
    socket.userId = userId
    socket.userName = userName

    socket.join(roomId)

    roomHandler(io, socket)
}

module.exports = {
    SOCKET_OPTIONS,
    onConnection,
}