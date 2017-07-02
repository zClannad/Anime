//配置axios拦截器
import axios from 'axios'
import store from '../vuex/store'
import router from './index'

// request 拦截器
axios.interceptors.request.use(
  config => {
    if(store.state.user){
      config.headers.Authorization = `user ${store.state.user}`
    }
    // console.log(config)
    return config;
  },
  err => {
    // console.log('err---'+config)
    return Promise.reject(err);
  }
)

// response 拦截器
axios.interceptors.response.use(
  response => {
    // console.log(response+'这是拦截器返回的信息')
    return response;
  },
  error => {
    // if (error.response){
    //   switch (error.response.status){
    //     case 401:
    //     // 返回401清除user信息并跳转到登录页面
    //     store.commit('user')
    //     router.replace('/admin/login')
    //   }
    // }
    // console.log(error+'axios,err')
    return Promise.reject(error)
  }
)
export default axios;
