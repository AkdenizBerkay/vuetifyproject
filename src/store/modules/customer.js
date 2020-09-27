import axios from 'axios';

const state = {
    customers: []
}

const getters = {
    getCustomers(state) {
        return state.customers;
    }
}
const mutations = {
    addCustomers(state, customer) {
        state.customers.push(customer);
    }
}

const actions = {
    saveCustomer({ commit }, data) {
        return new Promise((resolve, reject) => {
            return axios.post("/Customer2/Save", data)
                .then(response => {
                    resolve(response);
                    commit("addCustomers", data);
                })
                .catch(function (error) {
                    reject(error);
                    console.log(error);
                })
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}