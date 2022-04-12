<script setup lang="ts">
import { ref, withDefaults } from 'vue'
import DatePickerHeader from './DatePicker/DatePickerHeader.vue'
import DatePickerBody from './DatePicker/DatePickerBody.vue'
import dayjs, { Dayjs } from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import type {
  MonthArray,
  DatePickerValue,
  SingleDatePickerValue,
} from '@/types/datePicker'
import { Direction } from './DatePicker/index'
import { wrapInArray, getLastValue } from '@/util/helpers'
import { computed } from '@vue/reactivity'
dayjs.extend(isBetween)

const props = withDefaults(
  defineProps<{
    modelValue: DatePickerValue
    headerColor?: string
    range?: boolean
    min?: string | Date
    max?: string | Date
    allowedDates?: (date: string) => boolean
  }>(),
  {
    headerColor: 'yellow',
    range: false,
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: DatePickerValue): void
}>()

const lastValue: Dayjs = dayjs(
  Array.isArray(props.modelValue)
    ? getLastValue(props.modelValue)
    : (props.modelValue as SingleDatePickerValue)
)
const wrapInArrayValue = computed<(Date | string)[]>(() =>
  wrapInArray(props.modelValue)
)

const firstDayOfMonth = ref<string>(lastValue.startOf('month').format('d'))
const monthTotalDay = ref<string>(lastValue.endOf('month').format('D'))

let monthTitle = ref<string>(lastValue.format('MMMM YYYY'))
let month = ref<MonthArray>(
  buildMonth(+firstDayOfMonth.value, +monthTotalDay.value)
)
let year = ref<string>(lastValue.format('YYYY'))

function formatValue(value: DatePickerValue) {
  if (Array.isArray(value) && value.length !== 0) {
    value = value.map((item) => {
      return dayjs(item).format('YYYY-MM-DD')
    })
  } else {
    value = dayjs(value as SingleDatePickerValue).format('YYYY-MM-DD')
  }
  return value
}
emit('update:modelValue', formatValue(props.modelValue))

function changeMonth(change: string): void {
  change === Direction.next
    ? (monthTitle.value = dayjs(monthTitle.value)
        .add(1, 'Month')
        .format('MMMM YYYY'))
    : (monthTitle.value = dayjs(monthTitle.value)
        .subtract(1, 'Month')
        .format('MMMM YYYY'))
  firstDayOfMonth.value = dayjs(monthTitle.value).startOf('month').format('d')
  monthTotalDay.value = dayjs(monthTitle.value).endOf('month').format('D')
  month.value = buildMonth(+firstDayOfMonth.value, +monthTotalDay.value)
}

function buildMonth(firstDay: number, totalDay: number): MonthArray {
  const month: MonthArray = []
  for (let i = 0; i < 35; i++) {
    month[i] = { day: '' }
  }
  for (let i = 0; i < totalDay; i++) {
    month[firstDay + i] = {
      day: dayjs(
        `${dayjs(monthTitle.value).format('YYYY-MM')}-${i + 1}`
      ).format('YYYY-MM-DD'),
      selected: false,
    }
  }
  month.forEach((item: { day: string; selected?: boolean }) => {
    wrapInArray(props.modelValue).map((pickValue: string | Date) => {
      if (item.day === dayjs(pickValue).format('YYYY-MM-DD')) {
        item.selected = true
      }
      if (
        props.range &&
        wrapInArrayValue.value.length === 2 &&
        dayjs(item.day).isBetween(
          wrapInArrayValue.value[0],
          wrapInArrayValue.value[1]
        )
      ) {
        item.selected = true
      }
    })
  })
  return month
}

function selectDate(date: string): void {
  let wrapValue = wrapInArray(props.modelValue)
  if (date === '') {
    return
  }
  month.value.map((item: { day: string; selected?: boolean }) => {
    if (item.day === date) {
      item.selected = !item.selected
      item.selected
        ? wrapValue.push(item.day)
        : wrapValue.splice(
            wrapValue.findIndex((date) => date === item.day),
            1
          )
    }
  })
  if (props.range) {
    if (wrapValue.length > 2) {
      emit('update:modelValue', date)
      month.value = buildMonth(+firstDayOfMonth.value, +monthTotalDay.value)
      month.value.forEach((item: { day: string; selected?: boolean }) => {
        if ('selected' in item) {
          item.selected = false
        }
        if (item.day === date) {
          item.selected = true
        }
      })
      return
    }
    if (wrapValue.length === 2) {
      month.value = buildMonth(+firstDayOfMonth.value, +monthTotalDay.value)
      month.value.forEach((item: { day: string; selected?: boolean }) => {
        if ('selected' in item) {
          item.selected = false
        }
        if (
          item.day !== '' &&
          dayjs(item.day).isBetween(wrapValue[0], wrapValue[1], 'day', '[]')
        ) {
          item.selected = true
        }
      })
    }
  }
  let value = !(wrapValue.length === 0 || wrapValue.length === 1)
    ? wrapValue
    : wrapValue[0]
  emit('update:modelValue', value)
}
</script>

<template>
  <div>
    <date-picker-header
      :header-color="props.headerColor"
      :year="year"
    ></date-picker-header>
    <date-picker-body
      :month="month"
      :monthTitle="monthTitle"
      @select-date="selectDate"
      @change-month="changeMonth"
    ></date-picker-body>
  </div>
</template>
