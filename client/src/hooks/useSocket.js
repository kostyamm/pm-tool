import { io } from 'socket.io-client'
import { computed } from 'vue'
import { useStore } from 'vuex'

export const useSocket = (roomId) => {
    const store = useStore()
    const { value: user } = computed(() => store.getters['user/user'])

    const socket = io(import.meta.env.VITE_SOCKET_URL, {
        query: {
            roomId,
            userId: user.id,
            userName: user.name,
        },
    })

    socket.on('updateUsers', data => data && store.commit('room/setUsers', data))
    socket.on('updateTasks', data => data && store.commit('room/setTasks', data))
    socket.on('message', data => data && store.commit('room/setMessage', data))

    const emitVote = vote => socket.emit('vote', vote)
    const emitTask = task => socket.emit('addTask', { url: task })
    const emitSkipTask = () => socket.emit('skipTask')
    const emitMessage = message => socket.emit('message', message)

    const socketDisconnect = () => socket.disconnect()

    return { emitVote, emitTask, emitSkipTask, emitMessage, socketDisconnect }
}