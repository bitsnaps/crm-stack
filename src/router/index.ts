import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../components/Dashboard.vue'
import Contacts from '../components/Contacts.vue'
import Opportunities from '../components/Opportunities.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Dashboard },
    { path: '/contacts', component: Contacts },
    { path: '/opportunities', component: Opportunities },
  ]
})

export default router
