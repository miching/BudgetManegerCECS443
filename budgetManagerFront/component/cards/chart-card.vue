<template>
  <div>
    <Doughnut id="doughnut" :data="data" :options="options" />
  </div>
</template>

<script lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Chart, Doughnut } from "vue-chartjs";
import { expenseStore } from "../../stores/expenseStore";
const store = expenseStore();
ChartJS.register(ArcElement, Tooltip, Legend);

export default {
  name: "App",
  components: {
    Doughnut,
  },
  computed: {
    data() {
      return {
        labels: store.getExpType,
        datasets: [
          {
            label: "$",
            data: [
              store.getExpChilds,
              store.getExpBank,
              store.getExpTax,
              store.getExpHome,
              store.getExpHobbies,
              store.getExpTransport,
              store.getExpHealth,
              store.getExpFood,
            ],
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 205, 86)",
              "rgb(255, 205, 190)",
              "rgb(110, 205, 86)",
              "rgb(90, 10, 86)",
              "rgb(190, 205, 86)",
              "rgb(40, 22, 86)",
            ],
            hoverOffset: 4,
          },
        ],
      };
    },
  },
  mounted() {},
  methods: {},
  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
};
</script>
