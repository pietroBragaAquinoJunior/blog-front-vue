import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import http from './axios/http'
import { AxiosKey } from './axios/symbols'


const app = createApp(App)
app.use(createPinia())
app.use(router)
app.provide(AxiosKey, http)
app.mount('#app')
