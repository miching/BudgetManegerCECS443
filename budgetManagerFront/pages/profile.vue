<template id="root">
  <div class="mainDiv">
    <v-card class="mainCard">
      <div class="leftDiv">
        <form @submit.prevent="submit">
          <v-text-field
            v-model="username.value.value"
            :counter="10"
            :error-messages="username.errorMessage.value"
            label="Username"
          ></v-text-field>

          <v-text-field
            v-model="email.value.value"
            :error-messages="email.errorMessage.value"
            label="E-mail"
          ></v-text-field>

          <v-btn class="me-4" type="submit"> submit </v-btn>

          <v-btn @click="handleReset"> clear </v-btn>
          <v-btn @click="handleReset">  </v-btn>
          <v-snackbar v-model="snackbar" :timeout="3000">
            User info edited with success !

            <template v-slot:actions>
              <v-btn color="blue" variant="text" @click="snackbar = false">
                Close
              </v-btn>
            </template>
          </v-snackbar>
        </form>
        <h1>{{ snackbar }}</h1>
      </div>
    </v-card>
  </div>
</template>

<script>
import { ref } from "vue";
import { useField, useForm } from "vee-validate";
import serviceApi from "../service/Api";
export default {
  setup() {
    let snackbar = ref(false);
    const { handleSubmit, handleReset } = useForm({
      validationSchema: {
        username(value) {
          if (value?.length >= 2) return true;

          return "username needs to be at least 2 characters.";
        },
        email(value) {
          if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true;

          return "Must be a valid e-mail.";
        },
      },
    });
    const username = useField("username");
    const email = useField("email");

    const submit = handleSubmit((values) => {
      console.log(localStorage.getItem("jwt-token"));
      serviceApi
        .post(`/api/user/me`, values, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            console.log("snackbar avant", snackbar)
            snackbar = ref(true);
            console.log("snackbar apres", snackbar)
          }
        });
    });

    return { username, email, submit, snackbar, handleReset };
  },

  mounted() {
    serviceApi
      .get(`/api/users/me`, {
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      })
      .then((res) => {
        this.user = res.data;
        console.log(this.user);
      });
  },
  data() {
    return {
      edit: false,
      user: {},
    };
  },
};
</script>

<style lang="sass">
.mainDiv
    display: flex
    justify-content: center
    align-content: center

.mainCard
    display: flex
    height: 90%
    width: 90%
    flex-direction: row

.leftDiv
    display: flex
    flex-direction: column
    justify-content: center
    height: 100%
    width: 100%

.rightDiv
    display: flex
    flex-direction: column
    height: 100%
    width: 100%
</style>
