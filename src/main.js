import './assets/css/main.css'

import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import intersect from './util/intersect'

const app = createApp(App)

app.use(createPinia())
app.directive('intersect', intersect)
app.mount('#app')
