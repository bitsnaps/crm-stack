
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Dashboard from '../components/Dashboard.vue'
import Contacts from '../components/Contacts.vue'
import Opportunities from '../components/Opportunities.vue'

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: Dashboard },
  { path: '/contacts', component: Contacts },
  { path: '/opportunities', component: Opportunities },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
