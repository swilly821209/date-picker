<script setup lang="ts">
import { ref } from 'vue'
import DatePicker from '@/components/DatePicker.vue'
let value = ref<string | Date | (string | Date)[]>([
  new Date(),
  new Date('1993-12-09'),
])
</script>

<template>
  <div class="flex flex-col justify-center items-center h-screen">
    {{ value }}
    <!-- // 123 -->
    <date-picker v-model="value"></date-picker>
  </div>
</template>
