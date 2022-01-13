import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Todos from '../views/todos/index.vue'
import Todo from '../views/todos/_id.vue'


// 1.home   2.todos   3.todos/create    4.todos/:id
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/todos',
    name: 'Todos',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    component: Todos
  },
  {
    path: '/todos/:id',
    name: 'Todo',
    component: Todo
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
