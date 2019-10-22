import axios from "axios";
import  jwt_decode from 'jwt-decode';

const formState = {

};

const state = {
    allUsers: [],
    token: null,
    form: formState,
    role:  localStorage.getItem('role') || ''
};

const getters = { 
    USERS: state => {
        return state.allUsers;
    },

    ROLE: state => {
        return state.role;
    }
};

const mutations = {
    SET_USERS: (state, allUsers) => {
        state.allUsers = allUsers;
    },

    REGISTER_USER: (state, data) => {
        const token = jwt_decode(data.token);
        localStorage.setItem('role', token.role);
        state.token = data;
    },

    CLEAR_ROLE: () => {
        localStorage.removeItem('role');
        localStorage.removeItem('token');
    },

    REMOVE_USER: (state, allUsers) => {
        state.allUsers = allUsers;
    },
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

    REMOVE_USER: async ({commit}, payload) => {
        await axios
            .delete('http://localhost:5000/users/delete?userID=' + payload )
            .then(request => request.data)
            .then(allUsers => {
                commit('REMOVE_USER', allUsers);
            })
            .catch(error => console.log(error));
    },

    ADD_USER:  async ({dispatch}, data) => {
        await axios
            .post('http://localhost:5000/auth/register', data)
            .then(res => dispatch( res.data))
            .catch(error => console.log(error));
    },

    LOGIN_USER:  async ({commit}, payload) => {
        await axios
            .post('http://localhost:5000/auth/login', payload)
            .then(res => res.data)
            .then(token => {
                commit('REGISTER_USER', token);
            })
            .catch(error =>  console.log(error.response));
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


