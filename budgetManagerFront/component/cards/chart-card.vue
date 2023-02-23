<template>
  <div>
    <Doughnut id="doughnut" :data="data" :options="options" />
  </div>
</template>

<script lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "vue-chartjs";
import { PointElement } from "chart.js";
import store from "../../store/index";

ChartJS.register(ArcElement, Tooltip, Legend);

export default {
  name: "App",
  components: {
    Doughnut,
  },
  mounted() {
    console.log("mounted", store.state.expenseType);
  },
  data() {
    return {
      expenseType: store.state.expenseType,
      data: {
        labels: store.state.expenseType,
        datasets: [
          {
            label: "My First Dataset",
            data: [300, 50, 100, 20, 30],
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 205, 86)",
              "rgb(255, 205, 190)",
              "rgb(190, 205, 86)",
            ],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
};
</script>
