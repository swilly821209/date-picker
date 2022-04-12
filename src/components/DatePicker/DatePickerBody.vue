<script setup lang="ts">
import type { MonthArray } from '@/types/datePicker'
import LeftArrow from '../icon/LeftArrow.vue'
import RightArrow from '../icon/RightArrow.vue'
import { Direction } from './index'

const props = defineProps<{
  month: MonthArray
  monthTitle: string
}>()

const emit = defineEmits<{
  (e: 'selectDate', value: string): void
  (e: 'changeMonth', direction: string): void
}>()

const WEEK = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
</script>

<template>
  <div class="w-72 h-80">
    <div class="flex items-center" m="x-4 y-5">
      <left-arrow
        @click="emit('changeMonth', Direction.prev)"
        class="w-8 h-8 cursor-pointer"
      />
      <span class="flex-grow" font="bold" text="center">{{
        props.monthTitle
      }}</span>
      <right-arrow
        @click="emit('changeMonth', Direction.next)"
        class="w-8 h-8 cursor-pointer"
      />
    </div>
    <div
      class="flex justify-evenly opacity-60"
      font="bold"
      text="sm"
      m="x-1 y-2"
    >
      <span
        class="w-10 h-8 flex justify-center items-center"
        v-for="(item, index) in WEEK"
        :key="index"
        >{{ item }}</span
      >
    </div>
    <div class="flex flex-wrap" m="x-1 y-2">
      <span
        @click="emit('selectDate', item.day)"
        class="w-8 h-8 flex justify-center items-center rounded-1 transition-all"
        m="1"
        :class="{
          'cursor-pointer hover:bg-gray-300': item.day !== '' && !item.selected,
          'cursor-pointer bg-[#1867c0]': item.selected,
        }"
        v-for="(item, index) in props.month"
        :key="index"
        >{{ item.day.split('-')[2] }}</span
      >
    </div>
  </div>
</template>
