export const state = () => ({
  travels: {
    data: [],
    loading: false,
    fetched: false
  }
})

export const getters = {
  get: ({ travels }) => travels.data,
  loding: ({ travels }) => travels.loading
}

export const mutations = {
  /** Setters */
  setTravels({ travels }, value) {
    travels.data = value
  },
  setLoading({ travels }, value) {
    travels.loading = value
  },
  setFetched({ travels }, value) {
    travels.fetched = value
  },

  /** Custom methods */
  update({ travels }, value) {
    const travelsFiltered = travels.data.filter(
      travels => travels.id !== value.id
    )

    travelsFiltered.push(value)

    travels.data = travels
  },
  add({ travels }, value) {
    const { data } = travels

    data.push(value)

    travels.data = data
  },
  delete({ travels }, value) {
    const travelsFiltered = travels.data.filter(travel => travel.id !== value)

    travels.data = travelsFiltered
  }
}

export const actions = {
  async fetch({ commit, state: { travels } }) {
    if (!travels.fetched) {
      commit('setLoading', true)

      const response = await this.$axios.get('/travels')

      const {
        data: { data: travels = [] }
      } = response

      commit('setTravels', travels)
      commit('setFetched', true)
      commit('setLoading', false)
    }
  }
}
