import { ref } from "vue";

export const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  elements: {
    line: {
      borderWidth: 1.5
    },
    point: {
      radius: 0
    }
  },
  scales: {
    x: {
      display: false,
      grid: {
        display: false
      }
    },
    y: {
      grid: {
        display: false
      }
    }
  }
})