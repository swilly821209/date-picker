<script setup lang="ts">
import dayjs from 'dayjs'
import DatePicker from '@/components/DatePicker.vue'
let today = dayjs()
</script>

<template>
  <date-picker v-model="today"></date-picker>
  <div>HI</div>
</template>
