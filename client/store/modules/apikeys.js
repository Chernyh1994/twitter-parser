import axios from "axios";

const state = {
    api:null
};

const getters = { 
};

const mutations = {
};

const actions = {

    API_TWITTER:  async ({dispatch}, payload) => {
        await axios
            .post('http://localhost:5000/twitter/api', payload)
            .then(res => dispatch( res.data))
            .catch(error => console.log(error));
    },

};

const namespaced = true;

export default {
    namespaced,
    state,
    getters,
    actions,
    mutations
};
