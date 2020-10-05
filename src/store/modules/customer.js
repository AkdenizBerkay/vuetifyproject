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
    addCustomer(state, customer) {
        state.customers.push(customer);
    },
    updateCustomer(state,customer) {
        //console.log("customer: " + JSON.stringify(customer));
        
        //console.log("edit customer id "+customer.customerId);
        //var data = JSON.parse(state.customers);
        //console.log("parsed data: " + data);
        
        console.log(state.customers);
        //var oldData = state.customers.filter(d => d.customerId === customer.customerId);
        //alert("şimdi atacak");
        //var index= state.customers.indexOf(oldData);
        
        state.customers[customer.key] = customer;
        //alert("index "+ index)
        //state.customers.splice(index-1,1);
        //console.log(state.customers);
        //alert("şimdi ekleyecek");
        //state.customers.push(customer);
        
        //console.log(state.customers + customer);
    //    var a = state.customers.filter(k => {
    //          k.customerId == customer.customerId;
    //      });console.log(a);
        /*console.log("eskicustomer: " + JSON.stringify(benimdata));*/
    },
    initialCustomers(state, customers) {
        state.customers = customers;
    }
}

const actions = {
    addCustomer({ state,commit }, data) {
        return new Promise((resolve, reject) => {
            return axios.post("/Customer2/Save", data)
                .then(response => {
                    resolve(response);
                    commit("addCustomer", data);
                    console.log("state: ");
                    console.log(state.customers);
                    console.log("state: ");
                })
                .catch(function (error) {
                    reject(error);
                    console.log(error);
                })
        })
    },
    getCustomers({ commit, state }) {
        return new Promise((resolve, reject) => {
            return axios.get("/Customer2/GetAll")
                .then(response => {
                    resolve(response);
                    if (state.customers.length == 0) {
                        commit("initialCustomers", response.data);
                    }
                })
                .catch(function (error) {
                    reject(error);
                    console.log(error);
                })
        })
    },
    // eslint-disable-next-line no-unused-vars
    updateCustomer({commit},data) {
        return new Promise((resolve, reject) => {
            return axios.put("/Customer2/Update", data)
                .then(response => {
                    resolve(response);
                })
                .catch(function (error) {
                    reject(error);
                    console.log(error);
                })
        })
    },
}

export default {
    state,
    getters,
    mutations,
    actions
}