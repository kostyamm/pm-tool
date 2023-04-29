import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './routes.js'
import './assets/styles/style.scss'
import 'virtual:fonts.css'

const app = createApp(App)
const pinia = createPinia()

app
    .use(router)
    .use(pinia)
    .mount('#app')

