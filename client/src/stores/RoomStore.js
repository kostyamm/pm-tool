import { defineStore } from 'pinia'
import { useUserStore } from './UserStore.js'
import { addRoomGuest, getRoomById } from '../api/room.js'

export const useRoomStore = defineStore('RoomStore', {
    state: () => ({
        room: null,
        users: [],
        tasks: [],
        messages: [],
    }),
    getters: {
        isOwner: ({ room }) => {
            const UserStore = useUserStore()

            return UserStore.user?.id === room?.owner?._id
        },
        hasGuest: ({ room }) => {
            const UserStore = useUserStore()

            return room?.guests.some(({ _id }) => _id === UserStore.user?.id)
        },
    },
    actions: {
        async fetchRoomById(id) {
            const { room } = await getRoomById(id)
            this.room = room
        },
        async addGuest(id) {
            const { room } = await addRoomGuest(id)
            this.room = room
        },
    },
})