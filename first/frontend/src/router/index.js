import Vue from 'vue'
import VueRouter from 'vue-router'
import GetUser from '@/components/GetUserComponent'
import GistCreateComponent from '@/components/GistCreateComponent'
import GistListComponent from '@/components/GistListComponent'
import GistDetailComponent from '@/components/GistDetailComponent'
import GistEditComoponent from '@/components/GistEditComponent'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'getuser',
    component: GetUser
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/gist',
    name: 'gistList',
    component: GistListComponent
  },
  {
    path: '/gist/create',
    name: 'gistCreate',
    component: GistCreateComponent
  },
  {
    path: '/gist/:gist_id',
    name: 'gistDetail',
    component: GistDetailComponent
  },
  {
    path: '/gist/:gist_id/edit',
    name: 'gistEdit',
    component: GistEditComoponent
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
