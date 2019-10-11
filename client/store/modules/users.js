import axios from "axios";

const formState = {

};

const state = {
    allUsers: [],
    token: localStorage.getItem('token') || '',
    form: formState
};

const getters = { 
    USERS: state => {
        return state.allUsers;
    },
};

const mutations = {
    SET_USERS: (state, allUsers) => {
        state.allUsers = allUsers;
    },

    REGISTER_USER: (payload) => {
        console.log('complit')
    },

    RESET_FORM: (state, formState) => {
        state.form = formState
    }
};

const actions = {
    GET_USERS: async ({commit}) => {
        await axios
            .get('http://localhost:5000/users/users')
            .then(request => request.data)
            .then(allUsers => {
                commit('SET_USERS', allUsers);
            })
            .catch(error => console.log(error));
    },

    REMOVE_USER: async ({commit}, data) => {
        await axios
            .delete('http://localhost:5000/users/delete?userID=' + data )
            .then(res => {
                commit('GET_USERS', res.data)
            })
            .catch(error => console.log(error));
    },

    ADD_USER:  async ({dispatch}, payload) => {
        await axios
            .post('http://localhost:5000/auth/register', payload)
            .then(res => dispatch('RESET_FORM', res.data))
            .catch(error => console.log(error));
    },

    LOGIN_USER:  async ({dispatch}, payload) => {
        await axios
            .post('http://localhost:5000/auth/login', payload)
            .then(res => dispatch('REGISTER_USER', res.data))
            .catch(error => console.log(error));
    }
};

const namespaced = true

export default {
    namespaced,
    state,
    getters,
    actions,
    mutations
};


