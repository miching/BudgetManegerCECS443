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
            :items="expenseTypeName"
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
import { numericLiteral } from "@babel/types";
import serviceApi from "../../service/Api";
export default {
  data: () => {
    return {
      expenseType: [],
      expenseTypeName: [],
      expenseTypeSelected: "",
    };
  },

  methods: {
    getExpenseType() {
      serviceApi.get("/api/expense-types").then((data) => {
        data.data.data.forEach((item) => {
          this.expenseTypeName.push(item.attributes.ExpenseType);
          this.expenseType.push(item);
        });
      });
    },

    submitExpense() {
      console.log(this.expenseTypeSelected);
      console.log(this.ExpenseNumber);
      this.expenseType.forEach((item) => {
        if (this.expenseTypeSelected === item.attributes.ExpenseType) {
          serviceApi.post("/api/expenses", {
            data: {
              Expense: this.ExpenseNumber,
              expense_type: item.id,
            },
          });
        }
      });
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
