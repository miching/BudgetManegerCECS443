import { defineStore } from "pinia";
import moment from "moment";
import Cookies from "js-cookie";


export const expenseStore = defineStore('expenseStore', {
    state: () => ({
        token: Cookies.get("jwtToken"),
        openEdit: false,
        balance: 0,
        totalExpense: 0,
        totalExpenseChart: [],
        spentToday: 0,
        expsType: [
            "Childs",
            "Bank",
            "Tax",
            "Home",
            "Hobbies",
            "Transport",
            "Health",
            "Food",
            "Miscellaneous",
            "Auto"
        ],
        user: {},
        userExpense: [],
        expChilds: 0,
        expBank: 0,
        expTax: 0,
        expHome: 0,
        expHobbies: 0,
        expTransport: 0,
        expHealth: 0,
        expFood: 0,
        expMiscellaneous: 0,
        expAuto: 0,
        totExpType: [
            { name: "Childs", totalExpense: 0 },
            { name: "Bank", totalExpense: 0 },
            { name: "Tax", totalExpense: 0 },
            { name: "Home", totalExpense: 0 },
            { name: "Hobbies", totalExpense: 0 },
            { name: "Transport", totalExpense: 0 },
            { name: "Health", totalExpense: 0 },
            { name: "Food", totalExpense: 0 },
            { name: "Miscellaneous", totalExpense: 0 },
            { name: "Auto", totalExpense: 0 },
        ]
    }),
    getters: {
        getToken() {
            return this.token;
        },
        getExpType() {
            return this.expsType;
        },
        getTotExpType() {
            return this.totExpType;
        },
        getExpChilds() {
            return this.expChilds;
        },
        getExpBank() {
            return this.expBank
        },
        getExpTax() {
            return this.expTax
        },
        getExpHome() {
            return this.expHome
        },
        getExpHobbies() {
            return this.expHobbies
        },
        getExpTransport() {
            return this.expTransport
        },
        getExpHealth() {
            return this.expHealth
        },
        getUserExpense() {
            return this.userExpense;
        },
        getBalance() {
            return this.user.balance;
        },
        getTotExpense() {
            return this.totalExpense;
        },
        getExpFood() {
            return this.expFood;
        },
        getUser() {
            return this.user;
        },
        getTodayExpenses() {
            return this.spentToday;
        },
        getExpMiscellaneous() {
            return this.expMiscellaneous;
        },
        getExpAuto() {
            return this.expAuto;
        }
    },
    actions: {
        setBalance(number) {
            this.balance = number;
        },
        calculTotalExpense() {
            const date = new Date();
            this.totalExpense = 0;
            this.userExpense.forEach((elem) => {
                this.totalExpense += parseInt(elem.expense);
                if (elem.createdAt.split(' ')[0] === moment(date).format("YYYY-MM-DD")) {
                    this.spentToday += parseInt(elem.expense);
                }
            })
        },

        calculExpenseType() {
            this.clearExp();
            this.expsType.forEach((expType) => {
                this.userExpense.forEach((expUser) => {
                    if (expUser.expenseType === expType) {
                        this.addExp(expType, parseInt(expUser.expense))
                        //expType.totalExpense += parseInt(expUser.expense);
                    }
                })
            })
        },

        addExp(name, exp) {
            if (name === 'Childs') {
                this.expChilds += parseInt(exp);
            }
            if (name === 'Bank') {
                this.expBank += parseInt(exp);
            }
            if (name === 'Tax') {
                this.expTax += parseInt(exp);
            }
            if (name === 'Home') {
                this.expHome += parseInt(exp);
            }
            if (name === 'Hobbies') {
                this.expHobbies += parseInt(exp);
            }
            if (name === 'Transport') {
                this.expTransport += parseInt(exp);
            }
            if (name === 'Health') {
                this.expHealth += parseInt(exp);
            }
            if (name === 'Food') {
                this.expFood += parseInt(exp);
            }
            if (name === 'Miscellaneous') {
                this.expMiscellaneous += parseInt(exp);
            }
            if (name === 'Auto') {
                this.expAuto += parseInt(exp);
            }
        },
        clearExp() {
            this.expChilds = 0;
            this.expBank = 0;
            this.expTax = 0;
            this.expHome = 0;
            this.expHobbies = 0;
            this.expTransport = 0;
            this.expHealth = 0;
            this.expFood = 0;
            this.expMiscellaneous = 0;
            this.expAuto = 0;
        }
    },
})