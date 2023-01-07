import { createRouter, createWebHistory } from 'vue-router'
import store from './store/index.js'
import Cookies from 'js-cookie'

// Auto generates routes from vue files under ./pages
// https://vitejs.dev/guide/features.html#glob-import
const pages = import.meta.glob(['./pages/**/*.vue'])

const requiredAuthRoutes = [
    '/user',
    '/user/rooms',
    '/room/:id',
]

const paths = Object.keys(pages).map((path) => {
    const name = path
        .match(/\.\/pages(.*)\.vue$/)[1]
        .replace(/\/index$/, '')
        .toLowerCase()

    return {
        path: name,
        component: pages[path], // () => import('./pages/*.vue')
        meta: {
            requiredAuth: requiredAuthRoutes.some(item => item === name),
        },
    }
})

const routes = [
    ...paths,
    { path: '/:pathMatch(.*)*', component: () => import('./pages/Error.vue') },
]

const router = createRouter({
    history: createWebHistory('/'),
    routes,
})

router.beforeEach(async (to, from) => {
    const isRequiredAuth = to => to.matched.some(record => record.meta.requiredAuth)
    const token = Cookies.get('token')

    if (to.path === '/') {
        return { path: '/user' }
    }

    if (token && !store.getters['user/isAuth']) {
        await store.dispatch('user/checkAuth')
    }

    if (isRequiredAuth(to) && !store.getters['user/isAuth']) {
        return { path: '/login', query: { to: to.fullPath } }
    }
})

export default router
