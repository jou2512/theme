// Pathify
import { make } from 'vuex-pathify'
import { authService } from '../../Firebase/init'

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
      to: '/',
    },
    {
      title: 'Upcoming',
      icon: 'mdi-clipboard-list',
      to: '/',
    },
    {
      title: 'Fahrten',
      icon: 'mdi-car-side',
      to: '/',
    },
    {
      title: 'Kalender',
      icon: 'mdi-calendar',
      to: '/',
    },
  ],
  items2: [
    {
      title: 'Resultate',
      icon: 'mdi-newspaper',
      to: '/',
    },
    {
      title: 'Dokumente',
      icon: 'mdi-file-pdf',
      to: '/',
    },
    {
      title: 'Shop',
      icon: 'mdi-shopping',
      to: '/',
    },
  ],
  items3: [
    {
      title: 'Einstellungen',
      icon: 'mdi-cog',
      to: '/',
    },
    {
      title: 'Logout',
      icon: 'mdi-logout',
      to: '/start/',
      logout: () => {
        authService.logout()
      },
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
