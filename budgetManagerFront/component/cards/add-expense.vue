<template>
  <div class="expenseCard">
    <v-card title="Add Expense">
      <v-sheet width="300" class="mx-auto">
        <v-form ref="form">
          <v-text-field
            v-model="ExpenseNumber"
            :counter="10"
            type="number"
            label="Cost"
            required
          ></v-text-field>

          <v-select
            v-model="expenseTypeSelected"
            :items="expenseType"
            label="Expense Type"
          ></v-select>

          <div class="d-flex flex-column">
            <v-btn color="success" class="mt-4" block @click="submitExpense">
              Validate
            </v-btn>
          </div>
        </v-form>
      </v-sheet>
    </v-card>
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
      ExpenseNumber: null,
      expenseType: store.getExpType,
      expenseTypeName: [],
      expenseTypeSelected: "",
      userExpenseTmp: [],
    };
  },

  computed: {
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
          console.log(store.getUserExpense);
        });
    },

    submitExpense() {
      console.log(store.getUserExpense);
      const date = new Date();
      if (store.getUserExpense) {
        store.addExp(this.expenseTypeSelected, parseInt(this.ExpenseNumber));
        store.userExpense.push({
          expense: this.ExpenseNumber,
          expenseType: this.expenseTypeSelected,
          createdAt: moment(date).format("YYYY-MM-DD")
        });
        serviceApi
          .post(
            "/api/user/me",
            { userExpense: store.getUserExpense },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
              },
            }
          )
          .then((res) => {
          });
        this.addExpenseHotReload;
        this.ExpenseNumber = null;
        this.expenseTypeSelected = null;
      }
      console.log(store.getUserExpense);
    },
  },
  mounted() {
    this.getExpenseType();
  },
};
</script>

<style lang="sass">
.expenseCard
    width: 20%
</style>
