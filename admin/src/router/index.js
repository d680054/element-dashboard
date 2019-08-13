import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/views/Main'
import Login from '@/views/Login'
import CategoryEdit from '@/views/CategoryEdit'
import CategoryList from '@/views/CategoryList'
import ItemEdit from '@/views/ItemEdit'
import ItemList from '@/views/ItemList'
import HeroEdit from '@/views/HeroEdit'
import HeroList from '@/views/HeroList'
import ArticleEdit from '@/views/ArticleEdit'
import ArticleList from '@/views/ArticleList'
import AdminUserEdit from '@/views/AdminUserEdit'
import AdminUserList from '@/views/AdminUserList'
import About from '@/views/About'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/',
            name: 'main',
            component: Main,
            children: [
                { path: '/categories/create', component: CategoryEdit },
                { path: '/categories/edit/:id', component: CategoryEdit, props: true },
                { path: '/categories/list', component: CategoryList },
                { path: '/items/create', component: ItemEdit },
                { path: '/items/edit/:id', component: ItemEdit, props: true },
                { path: '/items/list', component: ItemList },
                { path: '/heros/create', component: HeroEdit },
                { path: '/heros/edit/:id', component: HeroEdit, props: true },
                { path: '/heros/list', component: HeroList },
                { path: '/articles/create', component: ArticleEdit },
                { path: '/articles/edit/:id', component: ArticleEdit, props: true },
                { path: '/articles/list', component: ArticleList },
                { path: '/admin_users/create', component: AdminUserEdit },
                { path: '/admin_users/edit/:id', component: AdminUserEdit, props: true },
                { path: '/admin_users/list', component: AdminUserList },

            ]
        }

    ]
})