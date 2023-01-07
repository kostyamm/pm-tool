import { auth, login, registration, fetchUserRooms, createUserRoom, removeUserRoom } from '../../api/user.js'

import Cookies from 'js-cookie'

const initialState = () => ({
    user: {},
    rooms: [],
    guestRooms: [],
})

const state = initialState()

const getters = {
    user: state => state.user,
    rooms: state => state.rooms,
    guestRooms: state => state.guestRooms,
    isAuth: state => !!state.user.token,
}

const actions = {
    logout: ({ commit }) => {
        Cookies.remove('token')
        commit('resetState')
    },
    signUp: async ({ commit }, data) => {
        const user = await registration(data)
        if (user) {
            commit('setUser', user)
        }

        return !!user
    },
    signIn: async ({ commit }, data) => {
        const user = await login(data)
        if (user) {
            commit('setUser', user)
        }

        return !!user
    },
    checkAuth: async ({ commit }, data) => {
        const user = await auth(data)
        if (user) {
            commit('setUser', user)
        }
    },
    fetchRooms: async ({ commit }) => {
        const { rooms, guestRooms } = await fetchUserRooms()
        if (rooms) {
            commit('setRooms', rooms)
            commit('setGuestRooms', guestRooms)
        }
    },
    createRoom: async ({ commit }, data) => {
        const room = await createUserRoom(data)
        if (room) {
            commit('setRooms', room)
        }
    },
    removeRoom: async ({ commit }, id) => {
        const roomId = await removeUserRoom(id)
        if (roomId) {
            commit('removeUserRoom', roomId)
        }
    },
}

const mutations = {
    resetState: (state) => Object.assign(state, initialState()),
    setUser: (state, user) => state.user = user,
    setRooms: (state, data) => {
        if (Array.isArray(data)) {
            state.rooms = data
        } else {
            state.rooms.push(data)
        }
    },
    setGuestRooms: (state, data) => state.guestRooms = data,
    removeUserRoom: (state, _id) => state.rooms = state.rooms.filter(item => item._id !== _id)
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}