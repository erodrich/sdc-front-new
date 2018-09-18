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
                        requiresAuth: true,
                    }
                },
            ],
        },
        {
            name: 'login',
            path: '/login',
            component: () => import('@/views/Login'),
            meta: {
                requiresVisitor: true,
            }
        },
        {
            name: 'logout',
            path: '/logout',
            component: () => import('@/views/Logout'),
            meta: {
                requiresAuth: true,
            }
        },
        {
            name: 'register',
            path: '/register',
            component: () => import('@/views/Registrar'),
            meta: {
                requiresAuth: true,
            }
        },
        {
            name: 'campaign',
            path: '/campaign/:id?',
            component: () => import('@/views/Campaign'),
            props: true,
            meta: {
                requiresAuth: true,
            }
        },
        {
            name: 'settings',
            path: '/settings',
            component: () => import('@/views/Settings'),
            meta: {
                requiresAuth: true,
            }
        },
        {
            name: 'beacons',
            path: '/beacons',
            component: () => import('@/views/Beacons'),
            meta: {
                requiresAuth: true,
            }
        },
        {
            name: 'campaign-edit',
            path: '/editor/:id?',
            props: true,
            component: () => import('@/views/CampaignEdit'),
            meta: {
                requiresAuth: true,
            }
        },
                {
            name: 'profile',
            path: '/profile',
            component: () => import('@/views/Profile'),
            meta: {
                requiresAuth: true,
            }
        },
        {
            name: 'page-not-found',
            path: '*',
            component: () => import('@/views/PageNotFound'),
        },

    ]
})