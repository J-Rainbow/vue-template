import axios from 'axios'
import jxAdapter from './jx-apdater'
import tbAdaptert from './gateway/gateway-adapter'

// const baseURL = window.appInfo && window.appInfo.route || 'http://release.shopeeman.com/api'
const baseURL = 'https://live.my.shopee.cn/webapi'
const AppRequest = axios.create({ // 壳内转发请求
  baseURL,
  timeout: 10000,
  headers: {
    'Accept': 'application/vnd.ppxias.v3+json'
  },
  withCredentials: true,
  adapter: config => {
    return jxAdapter(config)
  }
})
const locationRequest = axios.create({ // 本地转发请求
  baseURL: 'http://release.shopeeman.com',
  timeout: 5000,
  headers: {
    'Accept': 'application/vnd.ppxias.v3+json'
  },
  withCredentials: true
})
const ycjRequest = axios.create({ // 云采集请求
  baseURL: 'http://129.204.71.240',
  timeout: 5000,
  withCredentials: true,
  adapter: config => {
    return tbAdaptert(config)
  }
})
const otherRequest = axios.create({ // 第三方请求
  timeout: 5000,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36',
    'Accept': 'application/vnd.ppxias.v3+json'
  },
  withCredentials: true,
  adapter: config => {
    return jxAdapter(config)
  }
})
const jdRequest = axios.create({
  timeout: '50000',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36'
  },
  withCredentials: true,
  adapter: config => {
    return jxAdapter(config)
  }
})

export default {
  jdRequest,
  AppRequest, // 对接第三方请求
  ycjRequest, // 对接云采集请求
  otherRequest // 对接第三方请求

}
