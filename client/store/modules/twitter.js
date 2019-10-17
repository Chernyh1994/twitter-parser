import axios from "axios";

const state = {
    allTweets: [],
};

const getters = { 
    TWEET: state => {
        return state.allTweets;
    },
};

const mutations = {
    SET_TWEETS: (state, allTweets) => {
        state.allTweets = allTweets;
    },
};

const actions = {
    GET_TWEETS: async ({commit}) => {
        await axios
            .get('http://localhost:5000/twitter/tweets')
            .then(request => request.data)
            .then(allTweets => {
                commit('SET_TWEETS', allTweets);
            })
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
