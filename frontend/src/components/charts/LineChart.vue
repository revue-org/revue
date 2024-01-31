<script setup lang="ts">
import { Line } from 'vue-chartjs'
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip
} from 'chart.js'

const { chartData, chartOptions } = defineProps<{
  chartData: { labels: string[]; datasets: { data: number[] } }
  chartOptions: Object
}>()

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)
</script>

<template>
  <Line id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<style scoped lang="scss"></style>
