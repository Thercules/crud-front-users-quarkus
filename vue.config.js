const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8084,
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // Porta onde sua API está rodando
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    },
  },
})
