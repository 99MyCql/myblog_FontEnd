const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  // webpack的打包分析工具
  configureWebpack: {
    plugins: [
      new BundleAnalyzerPlugin()
    ],
    externals: {
      'highlight': 'hljs',
      'axios': 'axios'
    }
  },
  devServer: {
    // vue项目启动时的ip地址和端口
    host: 'localhost',
    port: 8000,
    proxy: {
      // 匹配所有以 /api 开头的url
      '/api': {
        // 请求的目标主机
        target: 'http://dev3.airdb.io:8081',
        changeOrigin: true,
        ws: true
        // 这样重写会把路径中 /api 消去
        // pathRewrite: {
        //   '^/api': '/api'
        // }
      }
    }
  }
}