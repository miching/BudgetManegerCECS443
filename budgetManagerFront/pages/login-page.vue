<template>
  <div class="mainDiv">
    <h1>Login</h1>
    <div class="cardDiv">
      <v-card>
        <form @submit.prevent="submit">
          <v-text-field
            v-model="username.value.value"
            :counter="10"
            :error-messages="username.errorMessage.value"
            label="Username"
          ></v-text-field>

          <v-text-field
            v-model="password.value.value"
            :counter="7"
            :error-messages="password.errorMessage.value"
            type="password"
            label="Password"
          ></v-text-field>

          <v-btn class="me-4" type="submit"> submit </v-btn>

          <v-btn @click="goRegister"> already registered login here </v-btn>
        </form>
      </v-card>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useField, useForm } from "vee-validate";
import serviceApi from "../service/Api";
import store from '../store/index'

export default {
  methods: {
    goRegister() {
      location.assign("/register-page");
    },
  },
  setup() {
    const { handleSubmit, handleReset } = useForm({
      validationSchema: {
        username(value) {
          if (value?.length >= 2) return true;

          return "Name needs to be at least 2 characters.";
        },
        password(value) {
          if (
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/.test(
              value
            )
          )
            return true;
          return "Must be a valid password, 1 uppercase letter, 1 lowercase letter, 1 special character.";
        },
      },
    });
    const username = useField("username");
    const password = useField("password");

    const items = ref(["Item 1", "Item 2", "Item 3", "Item 4"]);

    const submit = handleSubmit((values) => {
      console.log("register test", values);
      serviceApi.post("/api/auth/local", {
        identifier: values.username,
        password: values.password,
      }).then((response) => {
        console.log("response",response);
        if (response.status = 200) {
          console.log("jwt avant", store.state.token);
          store.state.token = response.data.jwt
          localStorage.setItem("jwt-token", response.data.jwt)
          console.log("jwt apres", store.state.token);
          location.assign('/dashboard');
        }
      }, (error) => {
        console.log("error", error);
      });
    });

    return { username, password, items, submit, handleReset };
  },
};
</script>

<style lang="sass">
.mainDiv
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  height: 100%
  width: 100%
.cardDiv
  height: 50%
  width: 50%
</style>
