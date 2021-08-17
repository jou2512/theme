// Utilities
import { make } from 'vuex-pathify'

const state = {
  notifications: [
    { type: 'message', message: 'Andrina hat dir geschrieben', to: '/' },
    { type: 'important', message: 'Neues Ranglisten System wird eingeführt', to: '/' },
    { type: 'message', message: 'Alexa hat dir geschrieben', to: '/' },
    { type: 'info', message: 'Die Brassards finden wieder statt', to: '/' },
    { type: 'important', message: 'Covid-19 Imfung wird ab jetzt vorausgesetzt', to: '/' },
    { type: 'events', message: 'weisswurst essen am 30.6.21', to: '/' },
  ],
  icons: {
    message: 'mdi-message-outline',
    important: 'mdi-alert-decagram',
    info: 'mdi-alert-circle-outline',
    events: 'mdi-newspaper',
  },
}

const mutations = {
  deletNotification (state, notificationIndex) {
    state.notifications.splice(notificationIndex, 1)
    console.log(state.notifications)
  },
}

const actions = {}

const getters = {
  notificationsLength: (state) => {
    return state.notifications.length
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
