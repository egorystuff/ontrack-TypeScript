<script setup lang="ts">
import { computed } from 'vue'
import { isUndefinedOrNull } from '../validators'
import { normalizeSelectValue } from '../functions'
import { ICON_X_MARK } from '../icons'
import BaseButton from './BaseButton.vue'
import BaseIcon from './BaseIcon.vue'

const props = defineProps<{
  options: { value: number | string; label: string }[]
  selected: number | string | null
  placeholder: string
}>()

const emit = defineEmits<{
  select: [value: number | string | null]
}>()

const isNotSelected = computed((): boolean => isUndefinedOrNull(props.selected))

function select(value: string | null): void {
  emit('select', normalizeSelectValue(value))
}
</script>

<template>
  <div class="flex gap-2">
    <BaseButton @click="select(null)">
      <BaseIcon :name="ICON_X_MARK" />
    </BaseButton>
    <select
      class="text -2xl w-full truncate rounded bg-gray-100 px-2 py-1"
      @change="select(($event.target as HTMLSelectElement).value)"
    >
      <option :selected="isNotSelected" disabled value="">
        {{ placeholder }}
      </option>

      <option
        v-for="{ value, label } in options"
        :key="value"
        :value="value"
        :selected="value === selected"
      >
        {{ label }}
      </option>
    </select>
  </div>
</template>
