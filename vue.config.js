const CopyWebpackPlugin = require('copy-webpack-plugin')
// const CompressionWebpackPlugin = require('compression-webpack-plugin')
// const productionGzipExtensions = ['js', 'css']
// const isProduction = process.env.NODE_ENV === 'production'
// const webpack = require("webpack");
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
  publicPath: './',
  // outputDir: './Debug/Plugins/js-home',
  lintOnSave: false, // 关闭Eslint
  productionSourceMap: false,
  configureWebpack: {
    // plugins: [
    //   // Ignore all locale files of moment.js
    //   new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    //   new UglifyJsPlugin({
    //     uglifyOptions: {
    //       compress: {
    //         drop_debugger: true,
    //         drop_console: true
    //       }
    //     },
    //     sourceMap: false,
    //     parallel: true
    //   }),
    //   // 配置compression-webpack-plugin压缩
    //   new CompressionWebpackPlugin({
    //     algorithm: 'gzip',
    //     test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
    //     threshold: 10240,
    //     minRatio: 0.8
    //   })
    // ],
    // 警告 webpack 的性能提示
    // performance: {
    //   hints: 'warning',
    //   // 入口起点的最大体积
    //   maxEntrypointSize: 500000000,
    //   // 生成文件的最大体积
    //   maxAssetSize: 3000000000,
    //   // 只给出 js 文件的性能提示
    //   assetFilter: function(assetFilename) {
    //     return assetFilename.endsWith('.js')
    //   }
    // }
  },
  devServer: {

    public: '172.15.252.138',
    port: '8089',
    hot: true,
    disableHostCheck: true

  }

}
