import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex/store'
// import Hello from '@/components/Hello'
// 首页
import Index from '@/components/index/Index'
// 后台登录
import Login from '@/components/admin/Login'
// 后台头部
import adminheader from '@/components/admin/adminheader'
// 后台添加数据
import AdminAdd from '@/components/admin/Add'
// 后台上传图片
import Upload from '@/components/admin/Upload'
// 后台管理中心
import Admin from '@/components/admin/Admin'
// 后台显示所有动漫的信息
import showAll from '@/components/admin/showAll'
// 编辑、修改数据
import Update from '@/components/admin/Update'
// 管理员登录
import AdmidLogin from '@/components/admin/Login'
// 前台头部
import homeHeader from '@/components/header/vHeader'
// 用户登录
import userLogin from '@/components/user/Login'
// 用户注册
import userRegister from '@/components/user/Register'
// 具体动漫的详情页
import Aname from '@/components/aname/aname'
// 聊天室
import ChatRoom from '@/components/chatRoom/ChatRoom'
// 404页面
import Error404 from '@/components/error404/Error404'




Vue.use(Router)


// 页面刷新时，重新赋值
if (window.localStorage.getItem('user')) {
  store.commit('isLogin', window.localStorage.getItem('user'))
}
if (window.localStorage.getItem('homeUser')) {
  store.commit('isHomeLogin', window.localStorage.getItem('homeUser'))
}


const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    }, {
      // 管理员登录
      path: '/admin/login',
      name: 'Login',
      component: Login
    }, {
      path: '/admin',
      // name: 'adminheader',
      component: adminheader,
      children: [
        { path: '/', meta: { requireAuth: true }, component: Admin },
        // 后台添加数据
        { path: 'add', meta: { requireAuth: true }, component: AdminAdd },
        // 后台上传图片
        { path: 'upload/:name', meta: { requireAuth: true }, component: Upload },
        // 显示数据
        { path: 'showAll', meta: { requireAuth: true }, component: showAll },
        // 更新/修改
        { path: 'update', meta: { requireAuth: true }, name: 'update', component: Update },
      ]
    }, {
      path: '/user',
      component: homeHeader,
      children: [
        { path: '/', component: userLogin },
        { path: 'register', component: userRegister }
      ]
    },{
      path: '/aname/:aname',
      name: 'aname',
      component: Aname
    },{
      path: '/chatroom',
      component: ChatRoom,
      beforeEnter:(to,from,next)=>{
        if(!store.state.homeUser){
          alert('请先登录')
        }else{
          next()
        }
      }
    },{
      path:'*',
      component: Error404
    }
  ]
})


// 全局导航钩子
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.state.user) {
      next();
    } else {
      next({
        path: '/admin/login',
        // query:{redirect: to.fullPath}
      })
    }
  } else {
    next();
  }
})
// 判断obj是否为空
// function isEmptyObject(obj){
//   for (var key in obj){
//     return false
//   }
//   return true
// }

// 路由跳转到页面的顶部
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
})
export default router



