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
  </div>
</template>

<script lang="ts">
import draggable from "vuedraggable";
import addExpense from "../component/cards/add-expense.vue";
import displayExpenses from "../component/cards/display-expenses.vue";

export default {
  components: {
    draggable,
    addExpense,
    displayExpenses
  },
  data: () => {
    return {
      drag: false,
      items: [
        { name: "CHART" },
        { name: "NOTIFICATION" },
        { name: "test4" },
        { name: "test5" },
      ],
      moro: [
        { name: "moro" },
        { name: "NFICATION" },
        { name: "tet4" },
        { name: "tt5" },
      ],
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
  justify-content: space-evenly
</style>
