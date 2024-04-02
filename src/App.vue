<script setup>
import { ref, provide, readonly } from 'vue'
import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS } from './constants'
import { generateTimelineItems, generatePeriodSelectoptions } from './functions'
import * as keys from './keys'
import {
  setActivitySecondToComplete,
  activitySelectOptions,
  createActivity,
  deleteActivity,
  activities
} from './activities'
import { currentPage, timelineRef } from './router'
import TheHeader from './components/TheHeader.vue'
import TheNav from './components/TheNav.vue'
import TheTimeline from './pages/TheTimeline.vue'
import TheActivities from './pages/TheActivities.vue'
import TheProgress from './pages/TheProgress.vue'

const timelineItems = ref(generateTimelineItems(activities.value))

function setTimelineItemActivity(timelineItem, activityId) {
  timelineItem.activityId = activityId
}

function updateTimelineItemActivitySeconds(timelineItem, activitySeconds) {
  timelineItem.activitySeconds += activitySeconds
}

provide(keys.updateTimelineItemActivitySecondsKey, updateTimelineItemActivitySeconds)
provide(keys.setTimelineItemActivityKey, setTimelineItemActivity)
provide(keys.setActivitySecondToCompleteKey, setActivitySecondToComplete)
provide(keys.createActivityKey, createActivity)
provide(keys.deleteActivityKey, deleteActivity)
provide(keys.periodSelectoptionsKey, readonly(generatePeriodSelectoptions()))
provide(keys.activitySelectOptionsKey, readonly(activitySelectOptions.value))
provide(keys.timelineItemsKey, readonly(timelineItems.value))
provide(keys.activitiesKey, activities.value)
</script>

<!-- --------------------------------------------------------------------------------- -->

<template>
  <TheHeader />

  <main class="flex flex-grow flex-col">
    <TheTimeline
      v-show="currentPage === PAGE_TIMELINE"
      :timeline-items="timelineItems"
      ref="timelineRef"
    />
    <TheActivities v-show="currentPage === PAGE_ACTIVITIES" :activities="activities" />
    <TheProgress v-show="currentPage === PAGE_PROGRESS" />
  </main>

  <TheNav />
</template>
