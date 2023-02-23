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
import serviceApi from "../../service/Api";
import store from '../../store/index';
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
    console.log("avant", store.state.expenseType)
    store.state.expenseType =  this.expenseTypeName;
    console.log("apres", store.state.expenseType)
  },
};
</script>

<style lang="sass">
.expenseCard
    width: 20%
</style>
