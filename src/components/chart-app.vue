<template>
  <Line v-if="loaded" :chart-data="chartData" />
</template>
  <script>
import { Line } from "vue-chartjs";
import axios from "axios";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
} from "chart.js";
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale
);
export default {
  name: "LineChart",
  components: {
    Line,
  },
  data() {
    return {
      loaded: false,
      chartData: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            label: "Market price (USD)",
            backgroundColor: "#F87944",
            color: "white",
            data: [40, 39, 10, 40, 39, 80, 40],
          },
        ],
      },

      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  created() {
    this.setChart();
  },
  methods: {
    async setChart() {
      try {
        const coinData = await axios.get(
          "https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true"
        );
        // this.chartData = coinData;
        this.chartData = {
          datasets: [
            {
              label: coinData.data.name,
              backgroundColor: "#f87979",
              data: coinData.data.values.map((data) => data.y),
            },
          ],
          labels: coinData.data.values.map((data) => {
            const newDate = new Date(data.x * 1000);
            const dateToDisplay = new Intl.DateTimeFormat("en-US").format(
              newDate
            );
            return dateToDisplay;
          }),
        };
        this.loaded = true;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>