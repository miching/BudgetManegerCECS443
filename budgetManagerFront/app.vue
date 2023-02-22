<template>
  <v-app>
    <NavBar></NavBar>
    <v-main>
      <NuxtPage />
    </v-main>
  </v-app>
</template>

<script>
import NavBar from "./component/NavBar.vue";

export default {
  components: {
    NavBar,
  },
};
</script>
