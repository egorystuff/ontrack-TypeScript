<script setup>
import { ref, computed, provide } from 'vue'
import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS } from './constants'
import {
  generateTimelineItems,
  generateActivitySelectOtions,
  generateActivities,
  generatePeriodSelectoptions
} from './functions'
import { currentPage, timelineRef } from './router'
import TheHeader from './components/TheHeader.vue'
import TheNav from './components/TheNav.vue'
import TheTimeline from './pages/TheTimeline.vue'
import TheActivities from './pages/TheActivities.vue'
import TheProgress from './pages/TheProgress.vue'

const activities = ref(generateActivities())
const timelineItems = ref(generateTimelineItems(activities.value))
const activitySelectOptions = computed(() => generateActivitySelectOtions(activities.value))

function deleteActivity(activity) {
  timelineItems.value.forEach((timelineItem) => {
    if (timelineItem.activityId === activity.id) {
      timelineItem.activityId = null
      timelineItem.activitySeconds = 0
    }
  })

  activities.value.splice(activities.value.indexOf(activity), 1)
}

function createActivity(activity) {
  activities.value.push(activity)
}

function setTimelineItemActivity(timelineItem, activityId) {
  timelineItem.activityId = activityId
}

function updateTimelineItemActivitySeconds(timelineItem, activitySeconds) {
  timelineItem.activitySeconds += activitySeconds
}

function setActivitySecondToComplete(activity, secondsToComplete) {
  activity.secondsToComplete = secondsToComplete
}

provide('updateTimelineItemActivitySeconds', updateTimelineItemActivitySeconds)
provide('setTimelineItemActivity', setTimelineItemActivity)
provide('setActivitySecondToComplete', setActivitySecondToComplete)
provide('createActivity', createActivity)
provide('deleteActivity', deleteActivity)
provide('periodSelectoptions', generatePeriodSelectoptions())
provide('activitySelectOptions', activitySelectOptions.value)
provide('timelineItems', timelineItems.value)
provide('activities', activities.value)
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
