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
import store from "../store/index";

export default {
  components: {
    draggable,
    addExpense,
    displayExpenses,
    chartCard
  },
  data: () => {
    return {
      drag: false,
    };
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
