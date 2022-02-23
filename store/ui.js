export const state = () => ({
  notification: {
    show: false,
    title: '',
    message: '',
    type: 'success'
  }
})

export const getters = {
  getNotificationMessage: ({ notification }) => notification.message,
  getNotificationType: ({ notification }) => notification.type
}

export const mutations = {
  setShow({ notification }, value) {
    notification.show = value
  },
  setTitle({ notification }, value) {
    notification.title = value
  },
  setMessage({ notification }, value) {
    notification.message = value
  },
  setType({ notification }, value) {
    notification.type = value
  }
}

export const actions = {
  hide({ commit }) {
    commit('setShow', false)
  },

  showError(
    { commit },
    { title = 'Ooops!', message = 'Qualcosa è andato storto' } = {}
  ) {
    commit('setType', 'error')
    commit('setTitle', title || 'Errore')
    commit('setMessage', message || '')
    commit('setShow', true)

    console.error(message)
  },
  showMessage(
    { commit },
    { title = 'Yeah!', message = 'Operazione andata a buon fine' } = {}
  ) {
    commit('setType', 'success')
    commit('setTitle', title || 'Successo')
    commit('setMessage', message || '')
    commit('setShow', true)

    console.log(message)
  }
}
