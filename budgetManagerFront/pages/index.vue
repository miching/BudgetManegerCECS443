<template>
  <v-container>
    <h1> Welcome to Budget Manager</h1>
    <div class="btnDiv">
      <v-btn @click="goRegister">Register</v-btn>
      <v-btn @click="goLogin">Login</v-btn>
    </div>
  </v-container>
</template>

<script>
import store from '../store/index'
export default {
  methods: {
    goRegister() {
      location.assign('/register-page')
    },
    goLogin() {
      location.assign('/login-page')
    }
  }
}
</script>


<style lang="sass">
  .v-container
    display: flex
    flex-direction: column
    justify-content: space-evenly
    align-items: center
    height: 100%

  .btnDiv
    display: flex
    justify-content: center
    .v-btn
      margin: 3%
      height: 200px
      width: 200px
</style>