<script setup>
import { computed } from 'vue'
import { validateSelectOptions, isUndefinedOrNull, isSelectValueValid } from '../validators'
import { normalizeSelectValue } from '../functions'
import { ICON_X_MARK } from '../icons'
import BaseButton from './BaseButton.vue'
import BaseIcon from './BaseIcon.vue'

const props = defineProps({
  selected: [String, Number],
  options: {
    required: true,
    type: Array,
    validator: validateSelectOptions
  },
  placeholder: { required: true, type: String }
})

const emit = defineEmits({ select: isSelectValueValid })

const isNotSelected = computed(() => isUndefinedOrNull(props.selected))

function select(value) {
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
      @change="select($event.target.value)"
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
