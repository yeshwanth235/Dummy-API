import { createRouter, createWebHistory } from 'vue-router'
import Homepage from '@/pages/HomePage.vue'
import MoviesPage from '@/pages/MoviesPage.vue'
import PokemonPage from '@/pages/PokemonPage.vue'
import ProductPage from '@/pages/ProductPage.vue'

let routes = [
  {
    path: '',
    name: 'home',
    component: Homepage
  },  
  {
    path: '/movies',
    name: 'movies',
    component: MoviesPage
  },
  {
    path: '/pokemon',
    name: 'pokemon',
    component: PokemonPage
  },
  {
    path: '/product',
    name: 'product',
    component: ProductPage
  }
]

let router = createRouter({
  history: createWebHistory(),
  routes
})

export default router