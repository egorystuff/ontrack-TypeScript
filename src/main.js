import './assets/main.css'
import App from './App.vue'
import * as storage from './storage'
import { createApp } from 'vue'
import { timelineItems } from './timeline-items'
import { activities } from './activities'

loadState()

document.addEventListener('visibilitychange', () => {
  document.visibilityState === 'visible' ? loadState() : saveState()
})

function saveState() {
  storage.save({
    timelineItems: timelineItems.value,
    activities: activities.value
  })
}

function loadState() {
  const state = storage.load()
  timelineItems.value = state.timelineItems
  activities.value = state.activities
}

createApp(App).mount('#app')
