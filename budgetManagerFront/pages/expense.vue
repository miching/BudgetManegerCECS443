<template>
  <div class="rounded-xl bg-white">
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
          <h1 class="text-base font-semibold leading-6 text-gray-900">Expenses</h1>
          <p class="mt-2 text-sm text-gray-700">
            A list of all the expenses in your account
          </p>
        </div>
      </div>
      <div class=" sm:-mx-0">
        <table class="w-full mx-auto divide-y divide-gray-300">
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
            <tr v-for="items in expenseAll" :key="items">
              <td
                class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0"
              >
                ${{ items.expense }}
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
  </div>
</template>

<script>
import serviceApi from "../service/Api";
import moment from "moment";
export default {
  data() {
    return {
      expenseAll: [],
    };
  },
  methods: {
    getExpense() {
      serviceApi
        .get("/api/users/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
          },
        })
        .then((data) => {
          console.log(data);
          this.expenseAll = data.data.userExpense;
          this.expenseAll.forEach((item) => {
            console.log(item);
            item.attributes.createdAt = moment()
              .subtract(10, "days")
              .calendar();
          });
          console.log(this.expenseAll);
        });
    },
  },
  mounted() {
    this.getExpense();
  },
};
</script>

<style lang="sass"></style>
