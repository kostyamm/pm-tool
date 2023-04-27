import { createStore, createLogger } from 'vuex'
import user from './modules/user.js'
import room from './modules/room.js'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
    modules: {
        user,
        room
    },
    strict: debug,
    plugins: debug ? [createLogger()] : [],
})