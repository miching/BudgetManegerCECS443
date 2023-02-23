import { createStore } from "vuex";

const store = createStore({
    state: {
        token: null,
        logreg: null,
        expenseType: [],

    },
    getters: {
        getToken(state) {
            return state.token;
        }
    },
    mutations: {},
    actions: {},
})

export default store;