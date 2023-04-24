<template>
  <div
    class="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img
        class="mx-auto h-64 w-64"
        src="https://ht.vnmod.net/wp-content/uploads/2022/06/110620221654933540.png"
        alt="Your Company"
      />
      <h2
        class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Register
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
      <div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
        <form class="space-y-6" @submit.prevent="submit">
          <div>
            <label
              for="username"
              class="block text-sm font-medium leading-6 text-gray-900"
              >username address</label
            >
            <div class="mt-2">
              <input
                id="username"
                v-model="username"
                name="username"
                type="username"
                autocomplete="username"
                required=""
                pattern="[A-Za-z0-9_]{3,20}"
                title="Username should be alphanumeric with minimum 3 and maximum 20 characters."
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              for="email"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Email address</label
            >
            <div class="mt-2">
              <input
                id="email"
                v-model="email"
                name="email"
                type="email"
                autocomplete="email"
                required=""
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                title="Please enter a valid email address."
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              for="password"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Password</label
            >
            <div class="mt-2">
              <input
                id="password"
                v-model="password"
                name="password"
                type="password"
                autocomplete="current-password"
                required=""
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#])[a-zA-Z\d@#]{8,}$"
                title="Password should be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one number."
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray -400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg
                  class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 transition ease-in-out duration-150"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3.293 6.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0L10 4.586V2a1 1 0 1 1 2 0v2.586l1.293-1.293a1 1 0 0 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0L8 7.414v5.172l2.293-2.293a1 1 0 0 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0L6 14.586V7.414l-2.293 2.293a1 1 0 1 1-1.414-1.414l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
              Sign in
            </button>
          </div>
        </form>
        <p class="mt-10 text-center text-sm text-gray-500">
        Already a member?
        {{ ' ' }}
        <a href="/login-page" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Signin here</a>
      </p>
      </div>
    </div>
  </div>
</template>
<script>

import serviceApi from "../service/Api";
export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
    };
  },
  methods: {
    submit() {
      serviceApi
        .post("/api/auth/local/register", {
          username: this.username,
          email: this.email,
          password: this.password,
          userExpense: [],
          todayExpense: 0,
        })
        .then(
          (response) => {
            console.log("response", response);
            if ((response.status = 200)) {
              location.assign("/login-page");
            }
          },
          (error) => {
            console.log("error", error);
          }
        );
    },
  },
};
</script>
