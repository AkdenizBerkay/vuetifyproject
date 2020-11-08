import axios from 'axios';

const state = {
    billboards: [],
    detailBillboard:{}
}

const getters = {
    getBillboards(state) {
        return state.billboards;
    }
}
const mutations = {
    addBillboard(state, billboard) {
        state.billboards.push(billboard);
    },/*
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
    },*/
    initialBillboards(state, billboards) {
        state.billboards = billboards;
    }
}

const actions = {
    addBillboard({ commit }, data) {
        return new Promise((resolve, reject) => {
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
    },
    getBillboards({ commit, state }) {
        return new Promise((resolve, reject) => {
            return axios.get("/Billboard/BillboardsWithImagesAndOwner")
                .then(response => {
                    if (state.billboards.length == 0) {
                        commit("initialBillboards", response.data);
                    }
                    resolve(response);
                })
                .catch(function (error) {console.log(error);
                    alert("catch de");
                    reject(error);
                    
                })
        })
    },
    /* eslint-disable no-unused-vars */
    getBillboardCustomer({commit},customerId) {
        return new Promise((resolve, reject) => {
            return axios.get("/Customer2/GetById/"+customerId)
                .then(response => {
                    resolve(response);
                })
                .catch(function (error) {console.log(error);
                    alert("catch de");
                    reject(error);
                    
                })
        })
    },
    
    /**/
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