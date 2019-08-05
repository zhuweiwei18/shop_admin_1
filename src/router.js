import vue from 'vue'
import VueRouter from 'vue-router'
import Login from './components/login/Login.vue'
import Home from './components/home/Home.vue'
import Users from './components/users/Users.vue'
import Roles from './components/roles/Roles.vue'
import Rights from './components/rights/Rights.vue'
import Goods from './components/goods/Goods.vue'
import Categories from './components/categories/Categories.vue'
import GoodsAdd from './components/goods/GoodsAdd.vue'
vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      children: [
        { path: '/users', component: Users },
        { path: '/roles', component: Roles },
        { path: '/rights', component: Rights },
        { path: '/goods', component: Goods },
        { path: '/categories', component: Categories },
        { path: '/goods-add', component: GoodsAdd }
      ]
    }
  ]
})

export default router
