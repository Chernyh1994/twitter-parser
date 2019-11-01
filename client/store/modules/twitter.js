import axios from "axios";

export default {
    namespaced: true,

    state: () => ({
        allTweets: [],
    }),

    getters: { 
        TWEET: state => {
            return state.allTweets;
        },
    },
    
    mutations: {
        SET_TWEETS: (state, allTweets) => {
            state.allTweets = allTweets;
        },
    
        REMOVE_TWEETS: (state, allTweets) => {
            state.allTweets = allTweets;
        },
    },
    
    actions: {
        GET_TWEETS: async ({commit}) => {
            await axios
                .get('http://localhost:5000/twitter/tweets')
                .then(request => request.data)
                .then(allTweets => {
                    commit('SET_TWEETS', allTweets);
                })
                .catch(error => console.log(error));
        },
    
        ADD_TWEETS:  async ({dispatch}, payload) => {
            await axios
                .post('http://localhost:5000/twitter/twitter', payload)
                .then(res => dispatch( res.data))
                .catch(error => console.log(error));
        },
    
        REMOVE_TWEET: async ({commit}, payload) => {
            await axios 
                .delete('http://localhost:5000/twitter/remove?tweetID='+ payload)
                .then(request => request.data)
                .then(allTweets => {
                    commit('REMOVE_TWEETS', allTweets);
                })           
                .catch(error => console.log(error));
        }
    },
};
