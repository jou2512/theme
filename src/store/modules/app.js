// Pathify
import { make } from 'vuex-pathify'
import 'firebase/auth'
import { authService } from '../../Firebase/init'
import router from '../../router/index'
import store from '../../store/index'

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
  admintool: [
    {
      title: 'Users',
      icon: 'mdi-account',
      to: '/users',
    },
    {
      title: 'Events',
      icon: 'mdi-calendar-plus',
      to: '/events',
    },
  ],
}

const mutations = make.mutations(state)

const actions = {
  ...make.actions(state),
  init: async ({ dispatch }) => {
    //
  },
  back: async (state) => {
    console.log('done')
    store.state.userfirebase.get = 0
    authService.logout()
    router.push('/start/')
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
