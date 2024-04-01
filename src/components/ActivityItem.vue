<script setup>
import { inject } from 'vue'
import { TrashIcon } from '@heroicons/vue/24/outline'
import { BUTTON_TYPE_DANGER } from '../constants'
import { isActivityValid } from '../validators'
import BaseButton from './BaseButton.vue'
import BaseSelect from './BaseSelect.vue'
import ActivitySecondsToComplete from './ActivitySecondsToComplete.vue'

const periodSelectoptions = inject('periodSelectoptions')
const setActivitySecondToComplete = inject('setActivitySecondToComplete')
const deleteActivity = inject('deleteActivity')

defineProps({
  activity: {
    required: true,
    type: Object,
    validator: isActivityValid
  }
})
</script>

<template>
  <li class="flex flex-col gap-2 p-4">
    <div class="flex items-center gap-2">
      <BaseButton :type="BUTTON_TYPE_DANGER" @click="deleteActivity(activity)">
        <TrashIcon class="h-5" />
      </BaseButton>
      <span class="truncate text-xl">{{ activity.name }}</span>
    </div>

    <div class="flex gap-2">
      <BaseSelect
        class="font-mono grow"
        placeholder="hh:mm"
        :options="periodSelectoptions"
        :selected="activity.secondsToComplete || null"
        @select="setActivitySecondToComplete(activity, $event || 0)"
      />
      <ActivitySecondsToComplete v-if="activity.secondsToComplete" :activity="activity" />
    </div>
  </li>
</template>
