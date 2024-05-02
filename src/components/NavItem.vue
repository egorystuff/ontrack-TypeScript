<script setup lang="ts">
import { navigate, currentPage } from '../router'
import { computed } from 'vue'
import type { NavItem } from '../types'
import BaseIcon from './BaseIcon.vue'

const props = defineProps<{
  navItem: NavItem
}>()

const classes = computed((): string[] => [
  'flex flex-col items-center p-2 text-xs capitalize',
  props.navItem.page === currentPage.value ? 'bg-gray-200' : 'hover:bg-gray-100'
])
</script>

<!-- --------------------------------------------------------------------------------- -->

<template>
  <li class="flex-1">
    <a :href="`#${navItem.page}`" :class="classes" @click="navigate(navItem.page)">
      <BaseIcon :name="navItem.icon" class="h-6 w-6" /> {{ navItem.page }}
    </a>
  </li>
</template>
