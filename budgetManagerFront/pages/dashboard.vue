<template>
  <!-- <draggable
    v-model="items"
    item-key="id"
    class="draggableDiv"
    @start="drag = true"
    @end="drag = false"
    animation="200"
  > -->
  <!-- <template #item="{ element }"> -->
  <!-- </template> -->
  <!-- </draggable> -->

  <div class="cardsDiv">
    <add-expense></add-expense>
    <display-expenses></display-expenses>
    <chart-card></chart-card>
  </div>
</template>

<script lang="ts">
import draggable from "vuedraggable";
import addExpense from "../component/cards/add-expense.vue";
import displayExpenses from "../component/cards/display-expenses.vue";
import chartCard from "../component/cards/chart-card.vue";

import serviceApi from "../service/Api";
import { expenseStore } from "../stores/expenseStore";

const store = expenseStore();

export default {
  components: {
    draggable,
    addExpense,
    displayExpenses,
    chartCard,
  },
  data: () => {
    return {
      key: store.expsType,
      drag: false,
    };
  },
  methods: {
  },

  mounted() {
    serviceApi
      .get("/api/users/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
        },
      })
      .then((data) => {
        store.userExpense = data.data.userExpense;
        console.log("store dashboprd expense", store.userExpense);
        store.calculExpenseType();
      });
  },
};
</script>

<style lang="sass">
.draggableDiv
  display: flex
  flex-wrap: wrap

.cardsDiv
  display: flex
  flex-direction: row
  margin-top: 5%
</style>
