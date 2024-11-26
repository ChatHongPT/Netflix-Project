<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const showHeader = !['auth'].includes(route.name as string)
</script>

<template>
  <Header v-if="showHeader" />
  <router-view />
</template>

<style>
body {
  margin: 0;
  background-color: #141414;
  color: #fff;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

#app {
  min-height: 100vh;
}
</style>