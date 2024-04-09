import { createRouter, createWebHistory } from 'vue-router'
import Homepage from '@/pages/HomePage.vue'
import MoviesPage from '@/pages/MoviesPage.vue'
import PokemonPage from '@/pages/PokemonPage.vue'
import ProductPage from '@/pages/ProductPage.vue'

const BASE_PATH = '/dummy-api'
let routes = [
  {
    path: '/dummy-api',
    name: 'home',
    component: Homepage
  },  
  {
    path: '/dummy-api/movies',
    name: 'movies',
    component: MoviesPage
  },
  {
    path: '/dummy-api/pokemon',
    name: 'pokemon',
    component: PokemonPage
  },
  {
    path: '/dummy-api/product',
    name: 'product',
    component: ProductPage
  }
]

let router = createRouter({
  history: createWebHistory(),
  routes
})

export default router