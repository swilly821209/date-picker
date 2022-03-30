<script setup lang="ts">
import dayjs from "dayjs";
import DatePicker from "@/components/DatePicker.vue";
let today = dayjs();
let aa = "aa";
let aad = "a";
</script>

<template>
  <date-picker v-model="today"></date-picker>
</template>
