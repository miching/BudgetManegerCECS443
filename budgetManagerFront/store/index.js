import { createStore } from "vuex";
import Api from '../service/Api'

const store = createStore({
    state: {
        token: null,
        expenseType: [],
        userExpense: [],
        expType: [
            {name: "childs", totalExpense: 0},
            {name: "bank", totalExpense: 0},
            {name: "tax", totalExpense: 0},
            {name: "home", totalExpense: 0},
            {name: "hobbies", totalExpense: 0},
            {name: "transport", totalExpense: 0},
            {name: "health", totalExpense: 0},
        ]
    },
    getters: {
        getToken(state) {
            return state.token;
        },
        getUserExpense(state) {
            return state.userExpense;
        },
        getExpenseType(state) {
            return state.expenseType;
        }
    },
    mutations: {
        calculExpenseType(state) {
            state.expenseType.forEach((expType) => {
                state.userExpense.forEach((expUser) => {
                    if (expUser.expense === expType) {
                        expType.totalExpense += expUser.expense;
                        console.log("total expense ====>", expType);
                    }
                })
            })
        }
    },
    actions: {
        calcul() {
            this.commit('calculExpenseType');
        }
    },
})

export default store;