import { addRoomGuest, getRoomById } from '../../api/room.js'

const initialState = () => ({
    room: null,
    users: [],
    tasks: [],
    messages: [],
})

const state = initialState()

const getters = {
    room: state => state.room,
    users: state => state.users,
    tasks: state => state.tasks,
    messages: state => state.messages,
    isOwner: (state, getters, rootState) => rootState.user.user.id === state.room?.owner?._id,
    hasGuest: (state, getters, rootState) => state.room?.guests.some(item => item._id === rootState.user.user.id),
}

const actions = {
    fetchRoomById: async ({ commit }, id) => {
        const { room } = await getRoomById(id)
        commit('setRoom', room)
    },
    addGuest: async ({ commit }, id) => {
        const { room } = await addRoomGuest(id)
        commit('setRoom', room)
    },
}

const mutations = {
    resetState: (state) => Object.assign(state, initialState()),
    setRoom: (state, data) => state.room = data,
    setUsers: (state, data) => state.users = data,
    setTasks: (state, data) => state.tasks = data,
    setMessage: (state, message) => state.messages.push(message),
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}