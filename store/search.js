export const state = () => ({
  results: {
    data: [],
    meta: {},
    loading: false,
    fetched: false
  }
})

export const getters = {
  get: ({ results }) => results.data,
  getMeta: ({ results }) => results.meta,
  loding: ({ results }) => results.loading
}

export const mutations = {
  /** Setters */
  setResults({ results }, value) {
    results.data = value
  },
  setMeta({ results }, value) {
    results.meta = value
  },
  setLoading({ results }, value) {
    results.loading = value
  },
  setFetched({ results }, value) {
    results.fetched = value
  }
}

export const actions = {
  async search({ commit }, { q, type }) {
    const response = await this.$axios.get('/search', {
      params: {
        q,
        type
      }
    })

    const {
      data: { data: results = [] }
    } = response

    commit('setResults', results)
  }
}
