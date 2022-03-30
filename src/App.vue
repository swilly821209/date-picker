<script setup lang="ts">
import dayjs from 'dayjs';
import DatePicker from '@/components/DatePicker.vue';
let today = dayjs();
let aa = 'aa';
let aad = 'a';
let aab = 'a';
</script>

<template>
  <div>{{ aa + aad + aab }}</div>
  <date-picker v-model="today"></date-picker>
</template>
