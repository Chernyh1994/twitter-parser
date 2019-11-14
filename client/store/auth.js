export const getters = {
  isAuthenticated(state) {
    return state.loggedIn
  },
  loggedInUser(state) {
    return state.user
  },

  roleInUser(state) {
    return state.user.role
  }
}

export const state = () => ({
  busy: false,
  loggedIn: false,
  strategy: "local",
  user: false
})
