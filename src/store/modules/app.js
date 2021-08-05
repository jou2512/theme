// Pathify
import { make } from 'vuex-pathify'

// Data
const state = {
  drawer: null,
  drawerImage: true,
  mini: false,
  items: [
    {
      title: 'Dashboard',
      icon: 'mdi-view-dashboard',
      to: '/',
    },
    {
      title: 'Notifications',
      icon: 'mdi-inbox',
      to: '/notifications',
    },
    {
      title: 'Upcoming',
      icon: 'mdi-clipboard-list',
      to: '/upcoming',
    },
    {
      title: 'Fahrten',
      icon: 'mdi-car-side',
      to: '/fahrten',
    },
    {
      title: 'Kalender',
      icon: 'mdi-calendar',
      to: '/kalender',
    },
  ],
  items2: [
    {
      title: ' ',
      icon: ' ',
    },
    {
      title: 'Resultate',
      icon: 'mdi-newspaper',
      to: '/resultate',
    },
    {
      title: ' ',
      icon: ' ',
    },
    {
      title: 'Dokumente',
      icon: 'mdi-file-pdf',
      to: '/dokumente',
    },
    {
      title: 'Shop',
      icon: 'mdi-shopping',
      to: '/shop',
    },
  ],
  items3: [
    {
      title: 'Einstellungen',
      icon: 'mdi-cog',
      to: '/einstellungen',
    },
  ],
}

const mutations = make.mutations(state)

const actions = {
  ...make.actions(state),
  init: async ({ dispatch }) => {
    //
  },
}

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
