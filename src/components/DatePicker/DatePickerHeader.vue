<script setup lang="ts">
const props = defineProps<{
  headerColor?: string
  year: string
}>()
let color = props.headerColor
  ? `background-color: ${props.headerColor}`
  : 'background-color: #1867c0'
</script>

<template>
  <div class="w-72 h-20" p="2" :style="color">
    <div class="opacity-60" text="[#FFF]">{{ year }}</div>
  </div>
</template>
