<script setup>
import { isActivityValid, isNumber, validateActivities, validateTimelineItems } from '../validators'
import ActivityItem from '../components/ActivityItem.vue'
import TheActivityForm from '../components/TheActivityForm.vue'
import TheActivitiesEmptyState from '../components/TheActivitiesEmptyState.vue'

defineProps({
  activities: {
    required: true,
    type: Array,
    validator: validateActivities
  },
  timelineItems: {
    required: true,
    type: Array,
    validator: validateTimelineItems
  }
})

const emit = defineEmits({
  setActivitySecondToComplete(activity, secondsToComplete) {
    return [isActivityValid(activity), isNumber(secondsToComplete)].every(Boolean)
  },
  deleteActivity: isActivityValid,
  createActivity: isActivityValid
})

function setSecondsToComplete(activity, secondsToComplete) {
  emit('setActivitySecondToComplete', activity, secondsToComplete)
}
</script>

<template>
  <div class="flex flex-col grow">
    <ul v-if="activities.length" class="divide-y grow">
      <ActivityItem
        v-for="activity in activities"
        :key="activity.id"
        :activity="activity"
        :timeline-items="timelineItems"
        @delete="emit('deleteActivity', activity)"
        @set-seconds-to-complete="setSecondsToComplete(activity, $event)"
      />
    </ul>

    <TheActivitiesEmptyState v-else />

    <TheActivityForm @submit="emit('createActivity', $event)" />
  </div>
</template>
