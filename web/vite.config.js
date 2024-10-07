// https://vitejs.dev/config/
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import path from 'path' // 关键代码

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false, // css in js
        }),
      ],
    }),
  ],
  resolve: {
    alias: {
      // 关键代码
      '@': path.resolve(__dirname, './src'),
      '@view': path.resolve(__dirname, './src/view'),
      '@common':path.resolve(__dirname,'./src/common'),
      '@components': path.resolve(__dirname, './src/components'),
      '@stores': path.resolve(__dirname, './src/stores'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@request': path.resolve(__dirname, './src/request')
    }
  },
  // devServer是webPack.js用的，这里我使用vite直接跟vite的server合并了
  server:{
    host: 'localhost', // 本地开发服务器地址
    port: 5175, // 开发服务器端口号
    open: true, // 启动时自动打开浏览器
    https: false, // 启用 HTTPS，默认 false，若需要 HTTPS，请设置为 true 或提供 HTTPS 配置
    hot: true, // 启用热模块替换
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // 后端 API 地址
        changeOrigin: true, // 修改请求头中的 Origin
        rewrite: path => path.replace(/^\/api/, ''), // 重写路径
      },
    },
  }
});
