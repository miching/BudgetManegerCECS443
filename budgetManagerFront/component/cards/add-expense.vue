<template>
  <div>
    <label for="price" class="block text-sm font-medium leading-6 text-gray-900"
      >Expense</label
    >
    <div class="relative mt-2 rounded-md shadow-sm">
      <div
        class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
      >
        <span class="text-gray-500 sm:text-sm">$</span>
      </div>
      <input
        type="text"
        v-model="ExpenseNumber"
        name="Expense"
        id="price"
        class="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder="0.00"
        aria-describedby="price-currency"
      />
      <div
        class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
      >
        <span class="text-gray-500 sm:text-sm" id="price-currency">USD</span>
      </div>
    </div>
    <div class="mt-10">
      <label for="country" class="">Expense Type</label>
      <select
        id="country"
        name="country"
        v-model="expenseTypeSelected"
        autocomplete="country-name"
        class="relative block w-full rounded-none rounded-t-md border-0 bg-transparent py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      >
        <option v-for="items in expenseType" :key="items">
          {{ items }}
        </option>
      </select>
    </div>
    <button
      type="button"
      @click="submitExpense"
      class="w-full mt-10 rounded-md bg-indigo-600 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      Validate
    </button>
  </div>
</template>

<script>
import serviceApi from "../../service/Api";
import moment from "moment";
import { expenseStore } from "../../stores/expenseStore";

const store = expenseStore();

export default {
  data: () => {
    return {
      user: Object,
      ExpenseNumber: null,
      expenseType: store.getExpType,
      expenseTypeName: [],
      expenseTypeSelected: "",
      userExpenseTmp: [],
    };
  },

  computed: {},
  methods: {
    getExpenseType() {
      serviceApi
        .get("/api/users/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
          },
        })
        .then((data) => {
          this.userExpenseTmp = data.data.userExpense;
        });
    },

    submitExpense() {
      const date = new Date();
      if (store.getUserExpense) {
        store.addExp(this.expenseTypeSelected, parseInt(this.ExpenseNumber));
        store.totalExpense += parseInt(this.ExpenseNumber);
        store.userExpense.push({
          expense: this.ExpenseNumber,
          expenseType: this.expenseTypeSelected,
          createdAt: moment(date).format("YYYY-MM-DD"),
        });
        serviceApi
          .post(
            "/api/user/me",
            { userExpense: store.getUserExpense, totalExpenses: store.getTotExpense },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
              },
            }
          )
          .then((res) => {
            store.user.totalExpenses = res.data.totalExpenses;
          });
        this.addExpenseHotReload;
        this.ExpenseNumber = null;
        this.expenseTypeSelected = null;
      }
    },
  },
  mounted() {
    this.getExpenseType();
  },
};
</script>
