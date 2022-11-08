var settle = require('axios/lib/core/settle')
const { NetService } = require('cyt-ipc')
const { Message } = require('element-ui')
module.exports = function jxAdapter(config) {
  return new Promise(function (resolve, reject) {
    if (config.method == 'get') {
      const params = {
        headers: config.headers,
        params: config.params
      }
      const url = config.baseURL ? config.baseURL + config.url : config.url
      NetService.get(url, params).then(rest => {
        var response = JSON.parse(rest)
        response.config = config
        if (response.data && response.code === 300) {
          Message.error(JSON.parse(response.data).message)
        }
        settle(resolve, reject, response)
      })
    } else if (config.method == 'post') {
      const params = {
        headers: config.headers,
        params: config.params
      }

      const url = config.baseURL ? config.baseURL + config.url : config.url
      const isUpload = config.headers['Content-Type'].indexOf('multipart/form-data') >= 0
      if (isUpload && config.url.indexOf('taobao.com/pic/') >= 0) { // 淘宝 上传图片
        config.headers.isGBK = false
        config.headers.urlencoded = false
        const data = JSON.parse(config.data)
        const { fileName, name } = data
        const imageBase64 = data[fileName]
        const imageName = name
        delete data.name
        delete data[fileName]
        delete data.fileName
        // string url, string options, object data, List<string> base64Files, List<string> fileNames, string contentType = "application/x-gzip"
        NetService.messageService.uploadMultipleFile(url, JSON.stringify(params), JSON.stringify(data), imageBase64, imageName, 'application/x-gzip').then(rest => {
          var response = JSON.parse(rest)
          response.config = config
          console.log(response)
          settle(resolve, reject, response)
        })
      } else if (isUpload && config.url.indexOf('uploadImage') >= 0) { // 淘宝特价 上传图片
        const data = JSON.parse(config.data)
        const { uploadImage, name } = data
        delete data.uploadImage
        delete data.name
        console.log(data, uploadImage)
        NetService.messageService.uploadFile(url, JSON.stringify(params), JSON.stringify(data), uploadImage, name, 'image/jpeg').then(rest => {
          var response = JSON.parse(rest)
          response.config = config
          console.log(response)
          settle(resolve, reject, response)
        })
      } else if (isUpload == true) {
        const data = JSON.parse(config.data)
        const name = data.name
        const file = data.file
        delete data.file
        /**
         * string url 请求地址
         * options
         * object body 里面什么都可以加
         * file 解析的base64 图片
         * fileName 解析的图片名
         */
        NetService.messageService.uploadFile(url, JSON.stringify(params), JSON.stringify(data), file, name).then(rest => {
          const response = JSON.parse(rest)
          response.config = config
          settle(resolve, reject, response)
        }).catch(() => {
          const response = {}
          response.config = config
          settle(resolve, reject, response)
        })
      } else {
        NetService.post(url, params, config.data).then(rest => {
          var response = JSON.parse(rest)
          response.config = config
          settle(resolve, reject, response)
        })
      }
    }
  })
}
