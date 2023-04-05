<template>
  <v-app>
    <v-main>
      <NavBar v-if="fuckingToken"></NavBar>
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
  methods:{

  },
  computed: {
    fuckingToken() {
      return this.token
    }
  },
  data() {
    return {
      token: localStorage.getItem('jwt-token')
    }
  }
};
</script>
