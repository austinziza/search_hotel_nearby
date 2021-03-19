import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SearchHotelApi from '../views/SearchHotelApi'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/searchhotelapi',
    name: 'SearchHotelApi',
    component: SearchHotelApi
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
