<template>
  <div class="text-center">
    <img class="w-20 mx-auto m-2" :src="image" alt="" />
    <div>Flux (FLUX)</div>
    <div>Hashrate: {{ hashRate.toFixed(2) }} Sol/s</div>
    <!-- <div>Parallel Assets: {{ parallelAssets.toFixed(4) }}</div> -->
    <!-- <div>Mined: {{ minedCoins.toFixed(4) }}</div> -->
    <div>Coins: {{ coins.toFixed(4) }}</div>
    <div>Price: ${{ price.toFixed(2) }}</div>
    <div>
      Ballance: <b>${{ ballance.toFixed(2) }}</b>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapMutations } from "vuex";
export default {
  name: "Flux",
  data() {
    return {
      minedCoins: 0,
      coins: 0,
      parallelAssets: 0,
      price: 0,
      coinsMinedOn2Miners: 10.031175,
      image: "",
      hashRate: 0,
    };
  },
  created() {
    this.getPrice();
    this.getCoins();
    setInterval(() => {
      this.getPrice();
      this.getCoins();
    }, 5 * 60 * 1000);
  },
  methods: {
    ...mapMutations({
      updateFlux: "updateFlux",
    }),
    getParallelAssets() {
      axios
        .get(
          "https://flux.minerpool.org/workers/t1Ztcer4A3mMEC5duWZCaewn7GUVp3JF52W"
        )
        .then((response) => {
          var regex = /<td>(\d+\.\d+?) FLUX<\/td>/gm;
          var matches,
            output = [];
          while ((matches = regex.exec(response.data))) {
            output.push(parseFloat(matches[1]));
          }
          const total = output.reduce((a, b) => a + b, 0);
          this.parallelAssets = total;
          this.coins = total + this.minedCoins;
        });
    },
    getCoins() {
      axios
        .get(
          "https://flux.minerpool.org/api/worker_stats?address=t1Ztcer4A3mMEC5duWZCaewn7GUVp3JF52W"
        )
        .then((response) => {
          this.hashRate = response.data.totalHash;
          this.minedCoins =
            response.data.paid +
            response.data.balance +
            response.data.immature +
            this.coinsMinedOn2Miners;
          this.getParallelAssets();
        });
    },
    getPrice() {
      // https://api.coingecko.com/api/v3/coins/list
      axios
        .get(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=zelcash"
        )
        .then((response) => {
          this.price = response.data[0].current_price;
          this.image = response.data[0].image;
        });
    },
  },
  computed: {
    ballance: function () {
      return this.price * this.coins;
    },
  },
  watch: {
    ballance: function () {
      this.updateFlux(this.ballance);
    },
  },
};
</script>
