// Imports
import Vue from 'vue'
import Router from 'vue-router'
import { trailingSlash } from '@/util/helpers'
import {
  layout,
  defaultroute,
  weboutroute,
} from '@/util/routes'
import 'firebase/auth'
import db, { authService } from '../Firebase/init'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: (to, from, savedPosition) => {
    if (to.hash) return { selector: to.hash }
    if (savedPosition) return savedPosition

    return { x: 0, y: 0 }
  },
  routes: [
    layout('Default', [
      defaultroute('Dashboard'),

      // Pages
      defaultroute('UserProfile', null, 'components/profile'),

      // Components
      defaultroute('Notifications', null, 'components/notifications'),
      defaultroute('Icons', null, 'components/icons'),
      defaultroute('Typography', null, 'components/typography'),

      // Tables
      defaultroute('Regular Tables', null, 'tables/regular'),

      // Maps
      defaultroute('Google Maps', null, 'maps/google'),
    ]), layout('webout', [
      weboutroute('Start'),
      weboutroute('confirmation', null, 'confirmation/:id'),
    ], '/start'),
  ],
})

router.beforeEach((to, from, next) => {
  if (to.path === '/start/confirmation/') {
    next('/start/')
  } else {
    try {
      if (to.matched[1].path === '/start/confirmation/:id') {
        if (to.params.id != null) {
          const cityRef = db.collection('users').doc(to.params.id)
          cityRef.get().then((doc) => {
            if (!doc.exists || doc.data().login.completed) {
              next('/start/')
            } else {
              to.path.endsWith('/') ? next() : next(trailingSlash(to.path))
            }
          })
        } else {
          to.path.endsWith('/') ? next() : next(trailingSlash(to.path))
        }
      } else {
        if (to.path === '/start/') {
          to.path.endsWith('/') ? next() : next(trailingSlash(to.path))
        } else {
          authService.authenticated().then(() => {
            if (authService.user) {
              console.log(from.fullPath)
              to.path.endsWith('/') ? next() : next(trailingSlash(to.path))
            } else {
              next('/start/')
            }
          })
        }
      }
    } catch (error) {
      console.log(error)
      next('/start/')
    }
  }
})

export default router
