import axios from "axios";

const state = {
    allUsers: [],
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
};

const namespaced = true

export default {
    namespaced,
    state,
    getters,
    actions,
    mutations
};


