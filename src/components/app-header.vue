<template>
  <div class="app-main-header">
    <nav class="nav-right">
      <RouterLink to="/home"><div class="nav-logo">We.Bitcoin</div></RouterLink>
      <div class="right-nav">
        <RouterLink to="/home">Home</RouterLink>
        <span>|</span>
        <RouterLink to="/contact">Contact</RouterLink>
        <span>|</span>
        <button @click="onLogout">
        <RouterLink  to="/">Logout</RouterLink>
        </button>
      </div>
    </nav>
  </div>
</template>

<script>
import { RouterLink, RouterView } from "vue-router";
import { userService } from '../services/user.service';

export default {
  methods:{
    onLogout(){
      console.log('logout:')
      this.$store.dispatch({ type: "logoutUser"});
      // userService.logout()
    }
  }
};
</script>
