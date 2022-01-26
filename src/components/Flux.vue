<template>
  <div class="text-center">
    <img class="w-20 mx-auto m-2" :src="image" alt="">
    <div>Flux (FLUX)</div>
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
      coins: 0,
      price: 0,
      coinsMinedOn2Miners: 10.031175,
      image: ''
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
    getCoins() {
      axios
        .get(
          "https://flux.minerpool.org/api/worker_stats?address=t1Ztcer4A3mMEC5duWZCaewn7GUVp3JF52W"
        )
        .then((response) => {
          this.coins =
            response.data.paid +
            response.data.balance +
            response.data.immature +
            this.coinsMinedOn2Miners;
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
