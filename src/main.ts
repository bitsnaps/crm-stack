import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import naive from 'naive-ui'
import './style.css'


createApp(App)
  .use(createPinia())
  .use(router)
  .use(naive)
  .mount('#app')