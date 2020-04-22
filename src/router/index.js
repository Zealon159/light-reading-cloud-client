import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 路由
const register = r => require.ensure([], () => r(require('@/pages/register')), 'register');
const login = r => require.ensure([], () => r(require('@/pages/login')), 'login');
const home = r => require.ensure([], () => r(require('@/pages/home')), 'home');
const myLike = r => require.ensure([], () => r(require('@/pages/my-like')), 'myLike');
const about = r => require.ensure([], () => r(require('@/pages/about')), 'about');
const booklist = r => require.ensure([], () => r(require('@/pages/book-list')), 'booklist');


// 动态路由主页
const routes = [
	{
		path: '/home',
		name: '主页',
		component: home
	},
	{
		path: '/register',
		name: '注册',
		component: register
	},
	{
		path: '/login',
		name: '登录',
		component: login
	},
	{
		path: '/my-like',
		name: '我喜欢',
		component: myLike
	},
	{
		path: '/about',
		name: '关于',
		component: about
	},
	{
		path: '/booklist',
		name: '书单',
		component: booklist
	}
]

const router = new Router({
    routes 
})

export default router