import axios from "axios";

const state = {
    all: []
};

const getters = { 
    USERS: state => {
        return state.all;
    },
};

const mutations = {
    SET_USER: (state, payload) => {
        state.all = payload;
    },

    // DEL_USER: (state, id) => {
    // },
};

const actions = {
    GET_USER: async (context, payload) => {
        let {data} = await axios.get('http://localhost:5000/users/users');
        context.commit('SET_USER', data);
      },

    // REMOVE_USER: async (context, id) => {
    //     let {data} = await axios.delete('http://localhost:5000/users/delete'+ id);
    //     context.commit('DEL_USER', data);
    // },
};

const namespaced = true

export default {
    namespaced,
    state,
    getters,
    actions,
    mutations
};


