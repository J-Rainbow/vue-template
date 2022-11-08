import axios from 'axios'
import gatewayAdapter from './gateway-adapter'
export default {
  gatewayService: axios.create({
    timeout: '5000',
    withCredentials: true,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    adapter: (config) => {
      return gatewayAdapter(config)
    }
  })
}
