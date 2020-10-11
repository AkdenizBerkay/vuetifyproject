import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Projects from '../views/Projects.vue'
import Team from '../views/Team.vue'
import Customers from '../views/Customers.vue'
import Billboard from '../views/Billboard.vue'
import CreateBillboard from '../views/CreateBillboard.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/projects',
    name: 'Projects',
    component: Projects
  },
  {
    path: '/team',
    name: 'team',
    component: Team
  },
  {
    path: '/customers',
    name: 'customers',
    component: Customers
  },
  {
    path: '/billboard',
    name: 'billboard',
    component: Billboard
  },
  {
    path: '/createbillboard',
    name: 'CreateBillboard',
    component: CreateBillboard
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
