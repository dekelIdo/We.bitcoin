
<template>
  <section class="login-signup-page">
    <!-- signup -->
    <div v-if="isSignup" class="main-container">
      <div class="first-content">
        <div class="top-container">
          <h2>Join to us</h2>
          <h3>Come to manage with us your crypto wallet</h3>
          <h4>Sign up and get 1000$ for free !</h4>
          <h5>It will take a few seconds...</h5>
        </div>
        <div class="bottom-container"></div>
      </div>
      <div class="second-content">
        <span>Username</span>
        <input
          v-model="username"
          type="text"
          placeholder="Enter your username"
        />
        <button @click="onClickSignup" class="create-account-btn">
          Create an account
        </button>
        <button @click="onSwitchSignUp" class="go-login-account-btn">
          Or Login
        </button>
      </div>
    </div>

    <!-- Login -->
    <div v-else class="main-container">
      <div class="first-content">
        <h2 class="login-title">Login</h2>
      </div>
      <div class="second-content">
        <span>Username</span>
        <input
          v-model="username"
          type="text"
          placeholder="Enter your username"
        />
        <span v-if="msg">{{ msg }}</span>
        <button @click="onClickLogin" class="create-account-btn">Login</button>
        <button @click="onSwitchSignUp" class="go-login-account-btn">
          Sign up now
        </button>
      </div>
    </div>
    <div class="right-container">
      <img
        class="go-back-icon"
        :src="`./images/bit-home.jpeg`"
        alt=""
      />
    </div>
  </section>
</template>

<script>
import { storageService } from '../services/storage.service';
import { userService } from "../services/user.service";
export default {
  data() {
    return {
      isSignup: true,
      username: "",
      msg: "",
    };
  },
  methods: {
    onSwitchSignUp() {
      this.isSignup = !this.isSignup;
    },

    async onClickLogin() {
      const username = this.username;
      const users = storageService.load("userDB") || gDefaultUsers;      
      const userIsExist = users.find((user) => user.name === username);

      if (!userIsExist) {
        return (this.msg = "User is not exist");
      }
      await userService.login(username);
      this.$store.dispatch({ type: "setUser", username });
      this.$router.push("/home");
    },

    async onClickSignup() {
      const username = this.username;
      await userService.signup(username);

      this.$store.dispatch({ type: "setUser", username });
      this.$router.push("/home");
    },
  },
  computed: {
    users() {
      return this.$store.getters.users;
    },
  },

  async created() {
    this.$store.dispatch({ type: "loadUsers" });
    console.log("users:", this.users);
    this.msg = "";
  },
};
</script>
