<script setup lang="ts">
import { PERIOD_SELECT_OPTIONS } from '../constants'
import { updateActivity, deleteActivity } from '../activities'
import { timelineItems, resetTimelineItemActivities } from '../timeline-items'
import { type Activity, IconName, ButtonType } from '../types'
import BaseButton from './BaseButton.vue'
import BaseSelect from './BaseSelect.vue'
import BaseIcon from './BaseIcon.vue'
import RemainingActivitySeconds from './RemainingActivitySeconds.vue'

defineProps<{ activity: Activity }>()

const deleteAndResetActivity = (activity: Activity): void => {
  resetTimelineItemActivities(timelineItems.value, activity)
  deleteActivity(activity)
}
</script>

<template>
  <li class="flex flex-col gap-2 p-4">
    <div class="flex items-center gap-2">
      <BaseButton :type="ButtonType.DANGER" @click="deleteAndResetActivity(activity)">
        <BaseIcon :name="IconName.TRASH" class="h-5" />
      </BaseButton>
      <span class="truncate text-xl">{{ activity.name }}</span>
    </div>

    <div class="flex gap-2">
      <BaseSelect
        class="grow font-mono"
        placeholder="hh:mm"
        :options="PERIOD_SELECT_OPTIONS"
        :selected="activity.secondsToComplete || null"
        @select="updateActivity(activity, { secondsToComplete: $event || 0 })"
      />
      <RemainingActivitySeconds v-if="activity.secondsToComplete" :activity="activity" />
    </div>
  </li>
</template>
