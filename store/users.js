export const state = () => ({
  users: {
    data: [],
    loading: false,
    fetched: false
  }
})

export const getters = {
  get: ({ users }) => users.data,
  loading: ({ users }) => users.loading
}

export const mutations = {
  /** Setters */
  setUsers({ users }, value) {
    users.data = value
  },
  setLoading({ users }, value) {
    users.loading = value
  },
  setFetched({ users }, value) {
    users.fetched = value
  },

  /** Custom methods */
  update({ users }, value) {
    const usersFiltered = users.data.filter(user => user.id !== value.id)

    usersFiltered.push(value)

    users.data = usersFiltered
  },
  add({ users }, value) {
    const { data } = users

    data.push(value)

    users.data = data
  },
  delete({ users }, value) {
    const usersFiltered = users.data.filter(user => user.id !== value.id)

    users.data = usersFiltered
  }
}

export const actions = {
  // TODO refactor all fetches using finally and catch
  async fetch({ commit }) {
    commit('setLoading', true)

    try {
      const response = await this.$axios.get('/users')

      const {
        data: { data: users = [] }
      } = response

      commit('setUsers', users)
      commit('setFetched', true)
    } catch (error) {
      console.log(error)
    } finally {
      commit('setLoading', false)
    }
  }
}
