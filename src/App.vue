<script setup>
import { RouterLink, RouterView } from "vue-router";
import AppHeader from "@/components/App-header.vue";
</script>

<template>
    <AppHeader class="full app-main-header"/>
  <div class="main-app main-layout">
    
    <RouterView />
  </div>
</template>

