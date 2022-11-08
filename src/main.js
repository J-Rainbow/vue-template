/*
 * @Author: your name
 * @Date: 2021-10-08 14:16:18
 * @LastEditTime: 2022-01-14 10:18:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \shopeeman-new\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element'
// ----------------------------------- 引入umy-ui
// import 'umy-ui/lib/theme-chalk/index.css' // 引入样式
// import 'element-ui/lib/theme-chalk/index.css'

import api from './network/jx-request'
import VueDND from 'awe-dnd'
import { UTable, UTableColumn } from 'umy-ui'
import { Logs } from 'cyt-pl-plug'
import * as filters from './plugins/filters'
import AliyunOssService from '@/services/aliyun-oss-service'

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])// 插入过滤器名和对应方法
})
// const config = {
//   openDebugger: process.env.NODE_ENV === 'development',
//   userName: 'xxx项目', // 当前操作的项目名
//   system_code: '', // 申请机器人 system_code
//   secret_key: '', // 申请机器人 secret_key
//   robot_name: '' // 申请机器人 robot_name
// }
// errorHanleCature(config).ListenerError().ListenerVueError(Vue) // 监听全局 error 、监听vue中的错误

Vue.use(UTable)
Vue.use(UTableColumn)

Vue.prototype.$ossService = new AliyunOssService()

// Vue.use(SvgIcon, {
//   tagName: 'svgicon'
// })

Vue.use(Logs)
Vue.use(VueDND)
Vue.prototype.$api = api
Vue.prototype.$filters = filters

// 所有的input框自动获取焦点
Vue.directive('fo', {
  inserted(el, binding, vnode) {
    // 聚焦元素
    el.querySelector('input').focus()
  }
})
Vue.directive('focus', {
  inserted(el, binding, vnode) {
    // 聚焦元素
    console.log('el', el)
    el.querySelector('textarea').focus()
  }
})
async function getUserInfo() {
}
getUserInfo()

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
