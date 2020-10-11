import axios from 'axios';

const state = {/*
    customers: []*/
}

const getters = {/*
    getCustomers(state) {
        return state.customers;
    }*/
}
const mutations = {/*
    addCustomer(state, customer) {
        state.customers.push(customer);
    },
    updateCustomer(state, customer) {
        //update edilecek datanın index ini bulduk
        const index = state.customers.findIndex(k => k.customerId === customer.customerId);
        //arrayımizden bulduğumuz indexdeki datayı çıkardık.
        state.customers.splice(index, 1);
        //arrayimizde bulduğumuz indexe yeni datayı ekledik.
        state.customers.splice(index, 0, customer);
    },
    deleteCustomer(state, customerId) {
        const index = state.customers.findIndex(k => k.customerId === customerId);
        state.customers.splice(index, 1);
    },
    initialCustomers(state, customers) {
        state.customers = customers;
    }*/
}

const actions = {
    addBillboard({ commit }, data) {
        return new Promise((resolve, reject) => {
            console.log(data);
            return axios.post("/Billboard/Save2", data)
                .then(response => {
                    commit("addBillboard", response.data);
                    resolve(response);
                })
                .catch(function (error) {
                    reject(error);
                    console.log(error);
                })
        })
    },/*
    getCustomers({ commit, state }) {
        return new Promise((resolve, reject) => {
            return axios.get("/Customer2/GetAll")
                .then(response => {
                    if (state.customers.length == 0) {
                        commit("initialCustomers", response.data);
                    }
                    resolve(response);
                })
                .catch(function (error) {
                    reject(error);
                    console.log(error);
                })
        })
    },*/
    /*// eslint-disable-next-line no-unused-vars: kullanmadığın bir objen varsa hatayı engeller.*/
    /*updateCustomer({ commit }, data) {
        return new Promise((resolve, reject) => {
            return axios.put("/Customer2/Update", data)
                .then(response => {
                    commit("updateCustomer", data);
                    resolve(response);
                })
                .catch(function (error) {
                    console.log("error: " + error);
                    reject(error);
                })
        })
    },
    deleteCustomer({ commit }, data) {
        return new Promise((resolve, reject) => {
            return axios.delete("/Customer2/Delete/" + data.customerId)
                .then(response => {
                    commit("deleteCustomer", data.customerId);
                    resolve(response);
                })
                .catch(function (error) {
                    reject(error);
                    console.log(error);
                })
        })
    }*/
}

export default {
    state,
    getters,
    mutations,
    actions
}