const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title= '你想设置的title名字'
        return args
      })
  },
  publicPath:"http://www.bytedance.com:8080/",
  devServer: {
    host:"www.bytedance.com",
    port:8080,
    historyApiFallback: true,
    allowedHosts: "all"
    // server: {
    //   type: 'https',
    //   options: {
    //     cert:"./server.cert" ,
    //     key:"./server.key" ,
    //   },
    // },
  }
})
