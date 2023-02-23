<template>
  <v-app>
    <v-main>
      <NavBar v-if="token != null"></NavBar>
      <NuxtPage />
    </v-main>
  </v-app>
</template>

<script>
import NavBar from "./component/NavBar.vue";
import store from './store/index'

export default {
  components: {
    NavBar,
  },
  mounted() {
    console.log(localStorage.getItem('jwt-token'));
  },
  data() {
    return {
      token: localStorage.getItem('jwt-token')
    }
  }
};
</script>
