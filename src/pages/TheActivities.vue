<script setup>
import { PlusIcon } from '@heroicons/vue/24/outline'
import { isActivityValid, validateActivities } from '../validators'
import { BUTTON_TYPE_PRIMARY } from '../constants'

import ActivityItem from '../components/ActivityItem.vue'
import BaseButton from '../components/BaseButton.vue'

defineProps({
  activities: {
    required: true,
    type: Array,
    validator: validateActivities
  }
})

const emit = defineEmits({
  deleteActivity: isActivityValid
})
</script>

<template>
  <div>
    <ul class="divide-y">
      <ActivityItem
        v-for="activity in activities"
        :key="activity"
        :activity="activity"
        @delete="emit('deleteActivity', activity)"
      />
    </ul>

    <form class="sticky bottom-[57px] flex gap-2 border-t bg-white p-4">
      <input type="text" placeholder="Activity name" class="w-full rounded border px-4 text-xl" />
      <BaseButton :type="BUTTON_TYPE_PRIMARY">
        <PlusIcon class="h-5" />
      </BaseButton>
    </form>
  </div>
</template>
