const store = {
    state: {
        currentUserDetail:null,
        userDetails:[],
        comments:[],
        myComments:[]
    },

    mutations: {
        SET_USER_DETAILS: (state, payload) => { state.userDetails = JSON.stringify(payload)},
        SET_CURRENT_USER_DETAIL: (state, payload) => { state.currentUserDetail = payload },
        SET_USER_COMMENTS: (state, payload) => { state.comments = JSON.stringify(payload)},
        SET_MY_COMMENTS: (state, payload) => { state.myComments = JSON.stringify(payload)},
    },

    getters: {
        userDetails: (state) => {  return state.userDetails.length > 0 ? JSON.parse(state.userDetails) : state.userDetails},
        currentUserDetail: (state) => {return state.currentUserDetail},
        userComments: (state) => {  return state.comments.length > 0 ? JSON.parse(state.comments) : state.comments},
        myComments: (state) => {  return state.myComments.length > 0 ? JSON.parse(state.myComments) : state.myComments},

    },

    actions: {
        setCurrentUserDetail ({ commit }, val) {
            commit('SET_CURRENT_USER_DETAIL', val)
        },
        setUserDetails({ commit },val){
            commit('SET_USER_DETAILS',val)
        },
        setUserComments ({ commit }, val) {
            commit('SET_USER_COMMENTS', val)
        },
        setMyComments ({ commit }, val) {
            commit('SET_MY_COMMENTS', val)
        },
    }
}

export default store