<template>
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="-mx-4 sm:-mx-0">
        <table class="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th
                scope="col"
                class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
              >
                Expense
              </th>
              <th
                scope="col"
                class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
              >
                Type
              </th>
              <th
                scope="col"
                class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                CreatedAt
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 bg-white">
            <tr
              v-for="(items, index) in userExpenseTest.slice(0, 5)"
              :key="index"
            >
              <td
                class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0"
              >
                {{ items.expense }}
              </td>
              <td
                class="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell"
              >
                {{ items.expenseType }}
              </td>
              <td
                class="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 lg:table-cell"
              >
                {{ items.createdAt }}
              </td>
              <td
                class="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0"
              ></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
</template>

<script>
import serviceApi from "../../service/Api";
import moment from "moment";

import { expenseStore } from "../../stores/expenseStore";

const store = expenseStore();

const storePinia = expenseStore();
export default {
  data() {
    return {
      expenseAll: store.userExpense,
    };
  },
  methods: {},
  computed: {
    userExpenseTest() {
      return store.userExpense;
    },
  },
  mounted() {
    console.log("dispmay pinia", storePinia.getExpType);
  },
};
</script>

<style lang="sass"></style>
