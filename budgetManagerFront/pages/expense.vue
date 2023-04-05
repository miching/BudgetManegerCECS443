<template>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">Type</th>
          <th class="text-left">Expense</th>
          <th class="text-left">Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in expenseAll" :key="item.expense">
          <td>
            {{ item.expenseType }}
          </td>
          <td>{{ item.expense }} $</td>
          <td>{{ item.createdAt }}</td>
        </tr>
      </tbody>
    </v-table>
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
      serviceApi.get("/api/users/me", {headers: {Authorization: `Bearer ${localStorage.getItem('jwt-token')}`}}).then((data) => {
        console.log(data);
        this.expenseAll = data.data.userExpense;
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