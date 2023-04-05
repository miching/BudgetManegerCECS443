<template>
  <v-table height="300px">
    <thead>
      <tr>
        <th class="text-left">Expense</th>
        <th class="text-left">Type</th>
        <th class="text-left">Date</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in userExpenseTest" :key="item">
        <td>
          {{ item.expense }}
        </td>
        <td>{{ item.expenseType }}</td>
        <td>{{ item.createdAt }}</td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
import serviceApi from "../../service/Api";
import moment from "moment";

import {expenseStore} from '../../stores/expenseStore'

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
      return store.userExpense.reverse();
    },
  },
  mounted() {
    console.log("dispmay pinia", storePinia.getExpType);
  },
};
</script>

<style lang="sass"></style>
