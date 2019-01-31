import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('@/views/Home'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/HomeGlobal'),
          meta: {
            requiresAuth: true
          }
        },
        {
          name: 'campaignForm',
          path: '/campaigns/edit/:id?',
          component: () => import('@/views/CampaignEdit'),
          props: true,
          meta: {
            requiresAuth: true
          }
        },
        {
          name: 'campaign',
          path: '/campaigns/:id?',
          component: () => import('@/views/Campaign'),
          props: true,
          meta: {
            requiresAuth: true
          }
        },
        {
          name: 'adForm',
          path: '/ads/edit',
          component: () => import('@/views/AdEdit'),
          props: true,
          meta: {
            requiresAuth: true
          }
        },
        {
          name: 'beaconsSelectCampaign',
          path: '/beacons/:id?/selectcampaign',
          component: () => import('@/views/BeaconsSelectCampaign'),
          meta: {
            requiresAuth: true
          }
        },
        {
          name: 'beacons',
          path: '/beacons',
          component: () => import('@/views/Beacons'),
          meta: {
            requiresAuth: true
          }
        },
        {
          name: 'statistics',
          path: '/statistics',
          component: () => import('@/views/Statistics'),
          meta: {
            requiresAuth: true
          }
        },
        {
          name: 'profile',
          path: '/profile',
          component: () => import('@/views/Profile'),
          meta: {
            requiresAuth: true
          }
        }
      ]
    },
    {
      path: '/admin',
      component: () => import('@/views/Home'),
      children: [
        {
          name: 'clientForm',
          path: 'clients/edit/:id?',
          component: () => import('@/views/ClientEdit'),
          props: true,
          meta: {
            requiresAuth: false
          }
        },
        {
          name: 'clients',
          path: 'clients/:id?',
          component: () => import('@/views/Clients'),
          props: true,
          meta: {
            requiresAuth: false
          }
        },
        {
          name: 'userForm',
          path: 'users/edit/:id?',
          component: () => import('@/views/UserEdit'),
          props: true,
          meta: {
            requiresAuth: false
          }
        },
        {
          name: 'users',
          path: 'users/:id?',
          component: () => import('@/views/Users'),
          props: true,
          meta: {
            requiresAuth: false
          }
        },
      ]
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/Login'),
      meta: {
        requiresVisitor: true
      }
    },
    {
      name: 'logout',
      path: '/logout',
      component: () => import('@/views/Logout'),
      meta: {
        requiresAuth: true
      }
    },
    {
      name: 'register',
      path: '/register',
      component: () => import('@/views/Registrar'),
      meta: {
        requiresAuth: true
      }
    },
    {
      name: 'page-not-found',
      path: '*',
      component: () => import('@/views/PageNotFound')
    },
    {
      name: 'icons',
      path: '/icons',
      component: () => import('@/views/Icons')
    }

  ]
})
