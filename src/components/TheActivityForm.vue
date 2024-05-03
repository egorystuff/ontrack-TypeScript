<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { id } from '../functions'
import { createActivity } from '../activities'
import { IconName, ButtonType } from '../types'

import BaseButton from './BaseButton.vue'
import BaseIcon from './BaseIcon.vue'

const name = ref('')

async function submit(): Promise<void> {
  createActivity({ id: id(), name: name.value, secondsToComplete: 0 })
  name.value = ''
  await nextTick()
  window.scrollTo(0, document.body.scrollHeight)
}
</script>

<template>
  <form @submit.prevent="submit" class="sticky bottom-[57px] flex gap-2 border-t bg-white p-4">
    <input
      type="text"
      v-model="name"
      placeholder="Activity name"
      class="w-full rounded border px-4 text-xl"
    />
    <BaseButton :disabled="name.trim() === ''" :type="ButtonType.PRIMARY">
      <BaseIcon :name="IconName.PLUS" />
    </BaseButton>
  </form>
</template>
