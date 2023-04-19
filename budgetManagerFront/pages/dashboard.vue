<template>
  <div>
    <dl
      class="mx-auto grid grid-cols-1 gap-px bg-gray-900/5 sm:grid-cols-2 lg:grid-cols-4"
    >
      <div
        v-for="stat in stats"
        :key="stat.name"
        class="flex flex-wrap rounded-lg items-baseline justify-evenly gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8 shadow-xl shadow-blue-500/50"
      >
        <dt class="text-sm font-medium leading-6 text-gray-500">
          {{ stat.name }}
        </dt>
        <dd
          :class="[
            stat.changeType === 'negative' ? 'text-rose-600' : 'text-gray-700',
            'text-xs font-medium',
          ]"
        >
          {{ stat.change }}
        </dd>
        <dd
          class="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900"
        >
          {{ stat.value }}
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
</template>

<script lang="ts">
import draggable from "vuedraggable";
import addExpense from "../component/cards/add-expense.vue";
import displayExpenses from "../component/cards/display-expenses.vue";
import chartCard from "../component/cards/chart-card.vue";

import serviceApi from "../service/Api";
import { expenseStore } from "../stores/expenseStore";
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
  { name: "Balance", value: "$12,787.00", change: "", changeType: "negative" },
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
  },
  data: () => {
    return {
      stats,
      key: store.expsType,
      drag: false,
      people,
    };
  },
  methods: {},

  mounted() {
    serviceApi
      .get("/api/users/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
        },
      })
      .then((data) => {
        store.userExpense = data.data.userExpense;
        console.log("store dashboprd expense", store.userExpense);
        store.calculExpenseType();
      });
  },
};
</script>
