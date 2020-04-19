module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  publicPath: './',
  devServer: {
      port: 9000,
      proxy: {
          "/api": {
              //请求源地址
              target: 'http://localhost:8010',    
              //是否跨域
              changeOrigin: true,  
              ws: true,
              pathRewrite: {
                  '^/api': ''
              }
          }
      }
  }
}