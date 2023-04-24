<template>
  <div>
    <nav-bar></nav-bar>

    <div
      class="rounded-xl bg-white shadow-xl shadow-blue-500/50 pt-4 mb-10 w-8/12 mx-auto"
    >
      <edit-expense-modal @close="(e) => openEdit = e" :open="openEdit"></edit-expense-modal>

      <div class="px-4 sm:px-6 lg:px-8">
        <div class="sm:flex sm:items-center">
          <div class="sm:flex-auto">
            <h1 class="text-base font-semibold leading-6 text-gray-900">
              Expenses
            </h1>
            <p class="mt-2 text-sm text-gray-700">
              A list of all the expenses in your account
            </p>
          </div>
        </div>
        <div class="sm:-mx-0">
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
                <th
                  scope="col"
                  class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  Edit/Delete
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              <tr v-for="(items, index) in expenseAll" :key="index">
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
                  class="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 lg:table-cell"
                >
                  <button
                    type="button"
                    @click="openEdit = true"
                    class="rounded-full p-1 text-gray-400 hover:text-black focus:outline-none focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span class="sr-only">EditExpense</span>
                    <PencilSquareIcon class="h-6 w-6" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    @click="(openDelete = true), (deleteIndex = index)"
                    class="rounded-full p-1 text-red-500/100 hover:text-black focus:outline-none focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span class="sr-only">DeleteExpense</span>
                    <TrashIcon class="h-6 w-6" aria-hidden="true" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { PencilSquareIcon, TrashIcon } from "@heroicons/vue/20/solid";
import serviceApi from "../service/Api";
import moment from "moment";
import navBar from "~~/component/nav-bar.vue";
import EditExpenseModal from "../component/edit-expense-modal.vue";
import { ExclamationTriangleIcon } from "@heroicons/vue/24/outline";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import EditExpense from "../component/edit-expense.vue";
import { expenseStore } from "~~/stores/expenseStore";

const store = expenseStore();

export default {
  components: {
    navBar,
    PencilSquareIcon,
    TrashIcon,
    EditExpenseModal,
    Dialog,
    DialogPanel,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    ExclamationTriangleIcon,
    EditExpense,
  },
  data() {
    return {
      expenseAll: [],
      openEdit: false,
      openDelete: false,
      deleteIndex: 0,
    };
  },
  methods: {

    setOpen(state) {
      this.openEdit = state
    },
    getExpense() {
      serviceApi
        .get("/api/users/me", {
          headers: {
            Authorization: `Bearer ${store.token}`,
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
