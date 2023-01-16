<script setup lang="ts">
import type { MonthArray } from '@/types/datePicker'
import LeftArrow from '../icon/LeftArrow.vue'
import RightArrow from '../icon/RightArrow.vue'
import { Direction } from './index'
import { ref, computed } from 'vue'
import dayjs from 'dayjs'

const props = defineProps<{
  month: MonthArray
  nowMonth: string
}>()

let nowType = ref<string>('Date')

const emit = defineEmits<{
  (e: 'selectDate', value: string): void
  (e: 'changeMonth', direction: string): void
}>()
const MONTHLIST = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC',
]
const WEEK = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
const monthTitle = computed<string>(() =>
  dayjs(props.nowMonth).format('MMMM-YYYY')
)
console.log(import.meta.env.BASE_URL)
</script>

<template>
  <div class="w-72 h-80">
    <div class="flex items-center" m="x-4 y-5">
      <left-arrow
        @click="emit('changeMonth', Direction.prev)"
        class="w-8 h-8 cursor-pointer"
      />
      <span
        @click="nowType = 'Month'"
        class="flex-grow cursor-pointer"
        font="bold"
        text="center hover:[#1867c0]"
      >
        {{ monthTitle }}
      </span>
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
    ></div>
    <div class="flex flex-wrap" m="x-1 y-2" v-if="nowType === 'Date'">
      <span
        class="w-10 h-8 flex justify-center items-center"
        v-for="(item, index) in WEEK"
        :key="index"
        >{{ item }}</span
      >
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
    <div
      v-if="nowType === 'Month'"
      class="flex flex-wrap justify-evenly h-58"
      m="x-1 y-2"
    >
      <span
        class="w-1/3 flex justify-center items-center rounded-xl"
        :class="{ 'bg-[#005caf] text-white': month === 'APR' }"
        v-for="(month, index) in MONTHLIST"
        :key="index"
      >
        {{ month }}
      </span>
    </div>
  </div>
</template>
