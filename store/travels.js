export const state = () => ({
  // All the travels
  travels: {
    data: [],
    results: [], // for search
    entity: {}, // for actions (show, edit, delete, book)
    loading: false,
    fetched: false
  }
})

export const getters = {
  get: ({ travels }) => travels.data,
  getResults: ({ travels }) => travels.results,
  getEntity: ({ travels }) => travels.entity,
  loding: ({ travels }) => travels.loading
}

export const mutations = {
  /** Setters */
  setTravels({ travels }, value) {
    travels.data = value
  },
  setResults({ travels }, value) {
    travels.results = value
  },
  setEntity({ travels }, value) {
    travels.entity = value
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
      travel => travel.id !== value.id
    )

    travelsFiltered.push(value)

    travels.data = travels
  },

  updateTour({ travels }, value) {
    if (value.index) {
      // create mode
      const tours = travels.entity.tours
      delete tours[value.index]

      console.log(tours)
      tours.push(value)
      console.log(tours)
      travels.entity.tours = tours
    } else {
      // edit mode
      const toursFiltered = travels.entity.tours?.filter(
        tour => tour.id !== value.id
      )

      toursFiltered.push(value)
      travels.entity.tours = toursFiltered
    }
  },

  add({ travels }, value) {
    const { data } = travels

    data.push(value)

    travels.data = data
  },

  addTour({ travels }, value) {
    const { entity } = travels

    // prevent get undefined on first travel creation
    if (!entity.tours) {
      entity.tours = []
    }

    entity.tours.push(value)

    // prevent passing the Proxy object reference
    travels.entity = { ...entity }
  },

  delete({ travels }, value) {
    const travelsFiltered = travels.data.filter(travel => travel.id !== value)

    travels.data = travelsFiltered
  }
}

export const actions = {
  async fetch({ commit }) {
    commit('setLoading', true)

    const response = await this.$axios.get('/travels')

    const {
      data: { data: travels = [] }
    } = response

    commit('setTravels', travels)
    commit('setFetched', true)
    commit('setLoading', false)
  },

  async show({ commit }, id) {
    commit('setLoading', true)

    const response = await this.$axios.get(`/travels/${id}`)
    const {
      data: { data: travel = {} }
    } = response

    commit('setEntity', travel)
    commit('setFetched', true)
    commit('setLoading', false)
  },

  async search({ commit }, value) {
    const response = await this.$axios.get('/travels', {
      params: {
        q: value
      }
    })

    const {
      data: { data: travels = [] }
    } = response

    commit('setResults', travels)
  },

  async update({ commit }, payload) {
    commit('setLoading', true)

    const response = await this.$axios.put(`/travels/${payload.id}`, payload)

    const {
      data: { data: travel = {} }
    } = response

    commit('update', travel)
    commit('setFetched', true)
    commit('setLoading', false)
  },

  async updateTour({ commit }, payload) {
    commit('setLoading', true)

    const response = await this.$axios.put(`/tours/${payload.id}`, payload)

    const {
      data: { data: tour = {} }
    } = response

    commit('updateTour', tour)
    commit('setLoading', false)
  },

  async storeTour({ commit }, payload) {
    commit('setLoading', true)

    const resposne = await this.$axios.post(`/tours`, payload)

    const {
      data: { data: tour = {} }
    } = resposne

    commit('addTour', tour)
    commit('setLoading', false)
  },

  clearEntity({ commit }) {
    commit('setEntity', {})
  }
}
