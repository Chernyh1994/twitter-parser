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

    LOGIN_USER:  async ({commit}, payload) => {
        await axios
            .post('http://localhost:5000/auth/login', payload)
            .then(res => res.data)
            .then(token => {
                commit('REGISTER_USER', token);
            })
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


