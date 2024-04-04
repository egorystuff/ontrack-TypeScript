<script setup>
import { provide, readonly } from 'vue'
import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS } from './constants'
import { generatePeriodSelectoptions } from './functions'
import * as keys from './keys'
import {
  setActivitySecondToComplete,
  activitySelectOptions,
  createActivity,
  deleteActivity,
  activities
} from './activities'
import {
  updateTimelineItemActivitySeconds,
  setTimelineItemActivity,
  resetTimelineItemActivities,
  timelineItems
} from './timeline-items'
import { currentPage, timelineRef } from './router'
import TheHeader from './components/TheHeader.vue'
import TheNav from './components/TheNav.vue'
import TheTimeline from './pages/TheTimeline.vue'
import TheActivities from './pages/TheActivities.vue'
import TheProgress from './pages/TheProgress.vue'

//----------------------------------------------------------------------------------------

provide(keys.updateTimelineItemActivitySecondsKey, updateTimelineItemActivitySeconds)
provide(keys.setTimelineItemActivityKey, setTimelineItemActivity)
provide(keys.setActivitySecondToCompleteKey, setActivitySecondToComplete)
provide(keys.createActivityKey, createActivity)
provide(keys.deleteActivityKey, (activity) => {
  resetTimelineItemActivities(activity)
  deleteActivity(activity)
})
provide(keys.periodSelectoptionsKey, readonly(generatePeriodSelectoptions()))
provide(keys.activitySelectOptionsKey, readonly(activitySelectOptions))
provide(keys.timelineItemsKey, readonly(timelineItems))
provide(keys.activitiesKey, activities.value)
</script>

<!-- --------------------------------------------------------------------------------- -->

<template>
  <TheHeader />

  <main class="flex flex-grow flex-col">
    <TheTimeline v-show="currentPage === PAGE_TIMELINE" ref="timelineRef" />
    <TheActivities v-show="currentPage === PAGE_ACTIVITIES" />
    <TheProgress v-show="currentPage === PAGE_PROGRESS" />
  </main>

  <TheNav />
</template>
