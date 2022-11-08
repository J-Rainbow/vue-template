const proPlugins = []
// // // 如果当前是生产环境，则使用去掉console的插件
if (process.env.NODE_ENV === 'production') {
  proPlugins.push('transform-remove-console')
}
module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }

    ],
    [
      'component',
      {
        'libraryName': 'umy-ui',
        'styleLibraryName': 'theme-chalk'
      },
      'el'
    ],
    ...proPlugins
  ]
  // 'compact': false
}
