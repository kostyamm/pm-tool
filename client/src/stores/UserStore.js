import { defineStore } from 'pinia'
import Cookies from 'js-cookie'
import { auth, login, registration, fetchUserRooms, createUserRoom, removeUserRoom } from '../api/user.js'

export const useUserStore = defineStore('UserStore', {
    state: () => ({
        user: null,
        rooms: [],
        guestRooms: [],
    }),
    getters: {
        isAuth: ({ user }) => !!user?.token,
    },
    actions: {
        logout() {
            Cookies.remove('token')
            this.$reset()
        },
        async signUp(data) {
            const user = await registration(data)

            if (user) this.user = user

            return !!user
        },
        async signIn(data) {
            const user = await login(data)

            if (user) this.user = user

            return !!user
        },
        async checkAuth(data) {
            const user = await auth(data)

            if (user) this.user = user
        },
        async fetchRooms () {
            const { rooms, guestRooms } = await fetchUserRooms()

            if (!rooms) return

            this.guestRooms = guestRooms
            this.rooms = rooms
        },
        async createRoom(data) {
            const room = await createUserRoom(data)

            if (!room) return

            this.rooms.push(room)
        },
        async removeRoom (id) {
            const roomId = await removeUserRoom(id)

            if (!roomId) return

            this.rooms = this.rooms.filter(({ _id }) => _id !== roomId)
        },
    },
})