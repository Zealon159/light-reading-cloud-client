import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 页面组件
const home = r => require.ensure([], () => r(require('@/pages/home')), 'home');
const search = r => require.ensure([], () => r(require('@/pages/search')), 'search');
const hello = r => require.ensure([], () => r(require('@/components/HelloWorld')), 'hello');
const register = r => require.ensure([], () => r(require('@/pages/register')), 'register');
const login = r => require.ensure([], () => r(require('@/pages/login')), 'login');
const about = r => require.ensure([], () => r(require('@/pages/about')), 'about');
const myLike = r => require.ensure([], () => r(require('@/pages/my-like')), 'myLike');
const myBookshelf = r => require.ensure([], () => r(require('@/pages/my-bookshelf')), 'myBookshelf');
const booklist = r => require.ensure([], () => r(require('@/pages/book-list')), 'booklist');
const bookDetails = r => require.ensure([], () => r(require('@/pages/book-details')), 'bookDetails');
const bookRead = r => require.ensure([], () => r(require('@/pages/book-read')), 'bookRead');

// 精品页
const homeIndex = r => require.ensure([], () => r(require('@/pages/home/index')), 'homeIndex');


// 路由配置
const routes = [
	{
		path: '/hello',
		name: 'HelloWorld',
		component: hello
	},
	{
		path: '/',
		name: '主页',
		component: home,
		children:[
			{
				path: '/index',
				name: '精品页',
				component: homeIndex
			},
			{
				path: '/my-like',
				name: '我喜欢',
				component: myLike
			},
			{
				path: '/my-bookshelf',
				name: '我的书架',
				component: myBookshelf
			}
		]
	},
	{
		path: '/search',
		name: '搜索',
		component: search
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
		path: '/about',
		name: '关于',
		component: about
	},
	{
		path: '/booklist/:id',
		name: '书单',
		component: booklist
	},
	{
		path: '/book-details/:bookId',
		name: '图书详情',
		component: bookDetails
	},
	{
		path: '/book-read/:bookId/:chapterId/:inShelf',
		name: '阅读',
		component: bookRead
	}
]

const router = new Router({
    routes 
})

export default router