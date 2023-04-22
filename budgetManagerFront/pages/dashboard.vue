<template>
  <div>
    <nav-bar></nav-bar>
    <div class="w-8/12 mx-auto">
      <dl
        class="mx-auto grid grid-cols-1 gap-px bg-gray-900/5 sm:grid-cols-2 lg:grid-cols-4"
      >
        <div
          v-for="stat in stats"
          :key="stat.name"
          class="flex flex-wrap rounded-lg items-baseline justify-evenly gap-x-4 gap-y-2 bg-white px-4 ml-1 py-10 sm:px-6 xl:px-8 shadow-xl shadow-blue-500/50"
        >
          <dt class="text-sm font-medium leading-6 text-gray-500">
            {{ stat.name }}
          </dt>
          <button v-if="stat.name === 'Balance'" @click="editState = true">
            Edit
          </button>
          <dd
            :class="[
              stat.changeType === 'negative'
                ? 'text-rose-600'
                : 'text-gray-700',
              'text-xs font-medium',
            ]"
          >
            {{ stat.change }}
          </dd>
          <dd
            v-if="stat.name !== 'Balance'"
            class="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900"
          >
            {{ stat.value }}
          </dd>
          <dd
            v-if="stat.name === 'Balance'"
            class="w-full flex text-3xl font-medium leading-10 tracking-tight text-gray-900"
          >
            <div v-if="stat.name === 'Balance' && editState">
              <div className="relative mt-2 w-full rounded-md shadow-sm">
                <div
                  className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
                >
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="text"
                  name="price"
                  v-model="balance"
                  id="price"
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="0.00"
                  aria-describedby="price-currency"
                />
                <div
                  className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  <span
                    className="text-gray-500 sm:text-sm"
                    id="price-currency"
                  >
                    USD
                  </span>
                </div>
              </div>
            </div>
            <button
              v-if="editState"
              class="ml-2"
              @click="(editState = false), updtadeBalance()"
            >
              V
            </button>
            <div v-if="stat.name === 'Balance' && !editState">
              {{ stat.value }}
            </div>
          </dd>
        </div>
      </dl>
      <div class="h-full">
        <ul role="list" class="grid grid-raw-1 gap-6 mt-20">
          <li class="col-span-1 divide-y divide-gray-200">
            <div class="flex justify-between space-x-6 p-6">
              <div
                class="w-3/12 p-2 rounded-lg bg-white shadow-xl shadow-blue-500/50"
              >
                <add-expense></add-expense>
              </div>
              <div
                class="w-auto rounded-lg bg-white shadow-xl shadow-blue-500/50"
              >
                <display-expenses></display-expenses>
              </div>
              <div class="rounded-lg bg-white shadow-xl shadow-blue-500/50">
                <chart-card></chart-card>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import draggable from "vuedraggable";
import addExpense from "../component/cards/add-expense.vue";
import displayExpenses from "../component/cards/display-expenses.vue";
import chartCard from "../component/cards/chart-card.vue";
import serviceApi from "../service/Api";
import { expenseStore } from "../stores/expenseStore";
import navBar from "../component/nav-bar.vue";
const people = {
  name: "Jane Cooper",
  title: "Regional Paradigm Technician",
  role: "Admin",
  email: "janecooper@example.com",
  telephone: "+1-202-555-0170",
  imageUrl:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
};

const store = expenseStore();
const stats = [
  { name: "Expenses", value: "800$", change: "", changeType: "positive" },
  {
    name: "Balance",
    value: store.getBalance,
    change: "",
    changeType: "negative",
  },
  {
    name: "+/- prev month",
    value: "$245,988.00",
    change: "-1.39%",
    changeType: "positive",
  },
  {
    name: "Rest to balance",
    value: "$30,156.00",
    change: "+10.18%",
    changeType: "negative",
  },
];

export default {
  components: {
    draggable,
    addExpense,
    displayExpenses,
    chartCard,
    navBar,
  },
  data: () => {
    return {
      editState: false,
      stats,
      key: store.expsType,
      drag: false,
      people,
      balance: store.getBalance,
    };
  },
  methods: {
    updtadeBalance() {
      serviceApi
        .post(
          "/api/user/me",
          { Balance: this.balance },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
            },
          }
        )
        .then((this.balance = store.getBalance));
    },
  },

  mounted() {
    serviceApi
      .get("/api/users/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
        },
      })
      .then((data) => {
        store.user = data.data;
        console.log("c'est le user", store.getUser);
        store.userExpense = data.data.userExpense;
        console.log("store dashboprd expense", store.userExpense);
        store.calculExpenseType();
      });
  },
};
</script>
