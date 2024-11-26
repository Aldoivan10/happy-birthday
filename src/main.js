import './assets/css/main.css'
import { router } from './routes/routes'

import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.mount('#app')
