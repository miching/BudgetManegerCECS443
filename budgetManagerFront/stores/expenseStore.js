import { defineStore } from "pinia";

export const expenseStore = defineStore('expenseStore', {
    state: () => ({
        token: null,
        balance: 0,
        totExpense: null,
        totalExpenseChart: [],
        expsType: [
            "Childs",
            "Bank",
            "Tax",
            "Home",
            "Hobbies",
            "Transport",
            "Health",
            "Food",
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
        totExpType: [
            { name: "Childs", totalExpense: 0 },
            { name: "Bank", totalExpense: 0 },
            { name: "Tax", totalExpense: 0 },
            { name: "Home", totalExpense: 0 },
            { name: "Hobbies", totalExpense: 0 },
            { name: "Transport", totalExpense: 0 },
            { name: "Health", totalExpense: 0 },
            { name: "Food", totalExpense: 0 },
        ]
    }),
    getters: {
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
            return this.totExpense;
        },
        getExpFood() {
            return this.expFood;
        },
        getUser(){
            return this.user;
        }
    },
    actions: {
        setBalance(number) {
            this.balance = number;
        },
        calculExpenseType() {
            this.clearExp();
            this.expsType.forEach((expType) => {
                this.userExpense.forEach((expUser) => {
                    console.log("EXPUSER", expUser);
                    console.log(expUser.expenseType, expType)
                    if (expUser.expenseType === expType) {
                        this.addExp(expType, parseInt(expUser.expense))
                        //expType.totalExpense += parseInt(expUser.expense);
                    }
                })
            })
        },
        addExp(name, exp) {
            console.log("calcul =====>", name, exp);
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
        },
        clearExp() {
            this.expChilds = 0;
            this.expBank = 0;
            this.expTax = 0;
            this.expHome = 0;
            this.expHobbies = 0;
            this.expTransport = 0;
            this.expHealth = 0;
        }
    },
})