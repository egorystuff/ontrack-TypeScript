<script setup>
import {
  CheckCircleIcon as CheckCircle,
  ListBulletIcon as ListBullet,
  ArrowPathIcon as ArrowPath,
  ChartBarIcon as ChartBar,
  ClockIcon as Clock,
  TrashIcon as Trash,
  XMarkIcon as XMark,
  PauseIcon as Pause,
  PlusIcon as Plus,
  PlayIcon as Play
} from '@heroicons/vue/24/outline'

const icons = {
  CheckCircle,
  ListBullet,
  ArrowPath,
  ChartBar,
  Clock,
  Trash,
  XMark,
  Pause,
  Plus,
  Play
}

defineProps({
  name: {
    required: true,
    type: String
  }
})
</script>

<template>
  <component :is="icons[name]" />
</template>
