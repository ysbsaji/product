import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import product from '../views/ProductPage.vue'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  {
    path: '/',
    name: 'product',
    component: product
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import(/* webpackChunkName: "CartPage" */'../views/CartPage.vue')
  },
  {
    path: '/productManagement',
    name: 'ProductManagement',
    component: () => import(/* webpackChunkName: "ProductManagementPage" */'../views/ProductManagementPage.vue')
  },
  {
    path: '/calender',
    name: 'calender',
    component: () => import(/* webpackChunkName: "CountryPage" */'../views/CalendarPage.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: "CountryPage" */'../components/user.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
