<template>
  <section v-if="user" class="home-page">
    <div class="home-header">
      <h1>Hello {{ user.name }} happy to see you again</h1>
      <h2 class="header-sub-title">
        Control your wealth and keep being updated
      </h2>
    </div>
    <div v-if="user" class="user-info-modal">
      <div class="user-info">
        <h3 class="user-title">{{ user.name }}'s balance</h3>

        <div class="balance-info">
          USD : <span class="balance-usd"> $ {{ user.balance }}</span>
        </div>
        <div class="balance-info">
          Bitcoin : <span> $ {{ userBitcoinBalance }}</span>
        </div>
        <RouterLink to="/contact">
          <div class="balance-info">
            <button class="view-contact-btn">View contacts</button>
          </div>
        </RouterLink>
        <div class="activities-title"><h3>Your transitions</h3></div>

        <div
          v-for="transaction in user.transactions"
          v-bind:key="transaction.at"
          v-bind:transactions="user.transactions"
        >
          <div v-if="user.transactions.length" class="activities-container">
            <div class="left-container">
              <span> {{ transaction.at }}</span>
              <h3>{{ transaction.to }}</h3>
              <span class="preview-price">${{ transaction.amount }}</span>
            </div>
            <div class="right-container">
              <span
                >BTC :
                {{ (transaction.amount / bitcoinValue).toFixed(8) }}</span
              >
              <span class="preview-status"
                >type :
                <span class="approved">{{ transaction.type }}</span></span
              >
            </div>
          </div>
        </div>
      </div>
      <div class="bitcoin-value">
        <span>BTC to {{ currentCoin }} </span>
        <h4>{{ bitcoinValue }}</h4>
        <div class="select-currency">
          <select @change="getCurrExchangeRate" v-model="currentCoin">
            <option
              v-for="currencyOption in currencyOptions"
              :key="currencyOption"
              :value="currencyOption"
            >
              {{ currencyOption }}
            </option>
          </select>
        </div>
      </div>
      <div class="chart-app-container">
        <chart-app />
      </div>
    </div>
  </section>
</template>

<script>
import ChartApp from "../components/chart-app.vue";
import { bitcoinService } from "../services/bitcoin.service";
import { userService } from "../services/user.service";
export default {
  components: { ChartApp },
  methods: {
    async getBitValue() {
      try {
        const bitcoin = await bitcoinService.getRate(this.currentCoin);
        this.bitcoinValue = bitcoin.buy;
        const userBalanceByBitcoin = this.user.balance / bitcoin.buy;
        this.userBitcoinBalance = userBalanceByBitcoin.toFixed(10);
      } catch (err) {
        console.log("err:", err);
      }
    },
    async getCurrExchangeRate() {
      const bitcoin = await bitcoinService.getRate(this.currentCoin);
      this.bitcoinValue = bitcoin.buy;
    },
    async getCurrencyOptions() {
      this.currencyOptions = await bitcoinService.getCurrencyOptions();
    },

    getDateForTransaction(id) {
      const transaction = this.user.transactions.find(
        (transaction) => transaction.at === id
      );
      console.log("transaction:", transaction);
      return transaction;
    },
  },

  computed: {
    user() {
      return this.$store.getters.user;
    },
  },

  data() {
    return {
      userBitcoinBalance: null,
      bitcoinValue: null,
      currentCoin: "USD",
      currencyOptions: [],
    };
  },

  async created() {
    this.user = await userService.getLoggedInUser();
    await this.getCurrExchangeRate();
    this.getBitValue();
    await this.getCurrencyOptions();
    console.log("this.currencyOptions:", this.currencyOptions);
  },
};
</script>


