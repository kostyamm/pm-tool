const { SocketState } = require('../socket-state')

const msg = (userName, message, userId) => ({
    id: `${Date.now()}${userId || ''}`,
    userName,
    message,
    userId,
})

const roomHandler = (io, socket) => {
    const { userId, userName, roomId } = socket

    const updateUsers = () => io.to(roomId).emit('updateUsers', SocketState.getUserList(roomId))
    const updateTasks = () => io.to(roomId).emit('updateTasks', SocketState.getTasks(roomId))

    SocketState.addUser({ userId, userName, roomId })

    updateTasks()
    updateUsers()

    socket.emit('message', msg('server', `Hi ${userName}`))
    socket.broadcast
        .to(roomId)
        .emit('message', msg('server', `User ${userName} joined`))

    socket.on('vote', vote => {
        SocketState.setVote(userId, vote)

        io.to(roomId).emit('message', msg('server', `${userName} voted for [${vote}]`))

        updateUsers()
    })

    socket.on('addTask', task => {
        SocketState.addTask(roomId, task)

        updateTasks()
    })

    socket.on('skipTask', () => {
        SocketState.skipTask(roomId)

        updateTasks()
        updateUsers()
    })

    socket.on('message', (message) => io.to(roomId).emit('message', msg(userName, message, userId)))

    socket.on('disconnect', () => {
        SocketState.removeUser(userId)

        updateUsers()

        io.to(roomId).emit('message', msg('server', `User ${userName} left the room`))
    })
}

module.exports = { roomHandler }