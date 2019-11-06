// import axios from "axios";

export default {
    namespaced: true,

    state: () => ({
        gecode:'',
        rad:'',
        API_Gmaps:'fdd'
    }),

    getters: {
        GEOCODE: state => {
            const rad = state.rad;
            const lat = state.gecode.lat;
            const lng = state.gecode.lng;
            const geo =  lat+","+ lng+ ","+ rad;
            if(lat === undefined || lng === undefined ){return ''}
            return geo;
        },
    },
    
    mutations: {
        NEW_RADIUS: (state, rad) => {
            state.rad = rad;
        },
        NEW_GEO: (state, gecode) => {
            state.gecode = gecode;
        },
        NEW_API_GMAPS: (state, API_Gmaps) => {
            state.API_Gmaps = API_Gmaps;
        }
    },
    
    actions: {
    
        // API_TWITTER:  async ({dispatch}, payload) => {
        //     await axios
        //         .post('http://localhost:5000/twitter/api', payload)
        //         .then(res => dispatch( res.data))
        //         .catch(error => console.log(error));
        // },
    
        ADD_RADIUS: ({commit}, payload) => {
            commit('NEW_RADIUS', payload);
        },
    
        ADD_GEO: ({commit}, payload) => {
            commit('NEW_GEO', payload);
        },

        ADD_API_GMAPS: ({commit}, payload) => {
            commit('NEW_API_GMAPS', payload)
        }
    
    },
};
