import './assets/main.css'
import App from './App.vue'
import { createApp } from 'vue'
import { syncState } from './storage'

syncState()

document.addEventListener('visibilitychange', () => {
  syncState(document.visibilityState === 'visible')
})

createApp(App).mount('#app')
