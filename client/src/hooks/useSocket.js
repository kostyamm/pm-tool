import { io } from 'socket.io-client'
import { useRoomStore } from '../stores/RoomStore.js'
import { useUserStore } from '../stores/UserStore'
import { storeToRefs } from 'pinia'

export const useSocket = (roomId) => {
    const RoomStore = useRoomStore()

    const { user } = storeToRefs(useUserStore())

    const socket = io(import.meta.env.VITE_SOCKET_URL, {
        query: {
            roomId,
            userId: user.value.id,
            userName: user.value.name,
        },
    })

    socket.on('updateUsers', users => RoomStore.users = users)
    socket.on('updateTasks', tasks => RoomStore.tasks = tasks)
    socket.on('message', message => RoomStore.messages.push(message))

    const emitVote = vote => socket.emit('vote', vote)
    const emitTask = task => socket.emit('addTask', { url: task })
    const emitSkipTask = () => socket.emit('skipTask')
    const emitMessage = message => socket.emit('message', message)

    const disconnectSocket = () => socket.disconnect()

    return { emitVote, emitTask, emitSkipTask, emitMessage, disconnectSocket }
}