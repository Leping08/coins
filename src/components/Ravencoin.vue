<template>
  <div class="text-center">
    <img class="w-20 mx-auto m-2" :src="image" alt="" />
    <div>
      <h3>Ravencoin (RVN)</h3>
    </div>
    <div>Coins: {{ coins.toFixed(4) }}</div>
    <div>Price: ${{ price.toFixed(4) }}</div>
    <div>
      Ballance: <b>${{ ballance.toFixed(2) }}</b>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapMutations } from "vuex";
export default {
  name: "Ravencoin",
  data() {
    return {
      coins: 571.05675, // Includes paid out and pending ballance
      price: 0,
      image: "",
    };
  },
  created() {
    this.getPrice();
    setInterval(() => {
      this.getPrice();
    }, 5 * 60 * 1000);
  },
  methods: {
    ...mapMutations({
      updateRavencoin: "updateRavencoin",
    }),
    getPrice() {
      // https://api.coingecko.com/api/v3/coins/list
      axios
        .get(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ravencoin"
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
      this.updateRavencoin(this.ballance);
    },
  },
};
</script>
