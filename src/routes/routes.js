import Config from '@/views/Config.vue'
import Main from '@/views/Main.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: Main,
  },
  { path: '/config', component: Config },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
