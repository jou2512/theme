// Pathify
import { make } from 'vuex-pathify'

const state = {
  step: 1,
  funktions: [
    'vorstandsmitglied',
    'maître',
    'erwachsenen trainer',
    'jugend trainer',
    'leistungssportler',
    'mentor',
    'azubi mentor',
    'young elite',
    'rising star',
    'engardien',
    'elternteil',
    'fechter/in',
  ],
}

const mutations = make.mutations(state)

const actions = {}

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
