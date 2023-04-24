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
      <label for="country">Expense Type</label>
      <select
        id="country"
        name="country"
        v-model="expenseTypeSelected"
        autocomplete="country-name"
        class="relative block w-full rounded-none rounded-t-md border-0 bg-transparent py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      >
        <option v-for="items in expenseType" :key="items">{{ items }}</option>
      </select>
    </div>
    <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
      <button
        type="button"
        class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
        @click="openEdit = false"
        :disabled="isSubmitDisabled"
      >
        Edit
      </button>
      <button
        type="button"
        class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
        @click="openEdit = false"
        ref="cancelButtonRef"
      >
        Cancel
      </button>
    </div>
  </div>
</template>

<script>
import serviceApi from "../service/Api";
import moment from "moment";
import { expenseStore } from "../stores/expenseStore";
import { storeToRefs } from "pinia";

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

  computed: {
    isSubmitDisabled() {
      return !this.ExpenseNumber || !this.expenseTypeSelected;
    },
  },

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
        store.spentToday += parseInt(this.ExpenseNumber);
        store.userExpense.unshift({
          expense: this.ExpenseNumber,
          expenseType: this.expenseTypeSelected,
          createdAt: moment(date).format(`YYYY-MM-DD hh:mm`),
        });
        serviceApi
          .post(
            "/api/user/me",
            {
              userExpense: store.getUserExpense,
              totalExpenses: store.getTotExpense,
              todayExpenses: store.getTodayExpenses,
            },
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
