var settle = require('axios/lib/core/settle')
module.exports = function gatewayAdapter(config) {
  const service = window['GatewayBridgeService']
  return new Promise(function(resolve, reject) {
    if (config.method == 'get') {
      const params = {
        headers: config.headers,
        params: config.params
      }
      // console.log("GatewayBridgeService get:",params);
      service.get(config.url, JSON.stringify(params)).then((rest) => {
        var response = JSON.parse(rest)
        response.config = config
        console.log(response)
        settle(resolve, reject, response)
      })
    } else if (config.method == 'post') {
      const params = {
        headers: config.headers,
        params: config.params
      }
      // console.log("GatewayBridgeService post:",params);
      service.post(config.url, JSON.stringify(params), config.data).then((rest) => {
        var response = JSON.parse(rest)
        response.config = config
        // console.log(response);
        settle(resolve, reject, response)
      })
    }
  })
}
