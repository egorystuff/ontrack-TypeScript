<script setup>
import { PlusIcon } from '@heroicons/vue/24/outline'
import { isActivityValid } from '../validators'
import { ref, nextTick } from 'vue'
import { BUTTON_TYPE_PRIMARY } from '../constants'
import BaseButton from './BaseButton.vue'

const activity = ref('')

const emit = defineEmits({
  submit: isActivityValid
})

async function submit() {
  emit('submit', activity.value)
  activity.value = ''

  await nextTick()
  window.scrollTo(0, document.body.scrollHeight)
}
</script>

<template>
  <form @submit.prevent="submit" class="sticky bottom-[57px] flex gap-2 border-t bg-white p-4">
    <input
      type="text"
      v-model="activity"
      placeholder="Activity name"
      class="w-full rounded border px-4 text-xl"
    />
    <BaseButton :disabled="activity.trim() === ''" :type="BUTTON_TYPE_PRIMARY">
      <PlusIcon class="h-5" />
    </BaseButton>
  </form>
</template>
