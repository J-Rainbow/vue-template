/**
 * 阿里云 存储服务
 */
export default class AliyunOssService {
    nativeService=window['AliyunOSSBridgeService'];
    /**
     * 上传文件到服务器 成功返回文件url，失败返回null
     * @param {string} base64Str 要上传文件的base64字符串
     * @param {string} name 文件名称
     * @param {int} pathType 路径类型 1,选品库 2,平台面单 3,选品库视频 4,仓库相关/产品中心 文件目录
     */
    uploadFile(base64Str, name, pathType = 1) {
      return this.nativeService.uploadFile(base64Str, name, pathType)
    }
    // uploadFile(base64Str, name) {
  // return this.nativeService.uploadFile(base64Str, name)
    // }
}
