<template>
  <div class="cardDiv">
    <v-table>
      <thead>
        <tr>
          <th class="text-left">Type</th>
          <th class="text-left">$</th>
          <th class="text-left">Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in expenseAll" :key="item.attributes.Expense">
          <td>
            {{ item.attributes.expense_type.data.attributes.ExpenseType }}
          </td>
          <td>{{ item.attributes.Expense }}</td>
          <td>{{ item.attributes.createdAt }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script>
import serviceApi from "../service/Api";
import moment from "moment"
export default {
  data() {
    return {
      expenseAll: [],
    };
  },
  methods: {
    getExpense() {
      serviceApi.get("/api/expenses?populate=*").then((data) => {
        this.expenseAll = data.data.data;
        this.expenseAll.forEach((item) => { 
            console.log(item)
            item.attributes.createdAt = moment().subtract(10, 'days').calendar();
        })
        console.log(this.expenseAll);
      });
    },
  },
  mounted() {
    this.getExpense();
  },
};
</script>

<style lang="sass">

</style>