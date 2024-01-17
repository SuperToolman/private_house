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
      '@components': path.resolve(__dirname, './src/components'),
      '@stores': path.resolve(__dirname, './src/stores'),
      '@assets': path.resolve(__dirname, './src/assets')
    }
  },
  devServer: {
    open: true, //配置自动启动浏览器
    host: "localhost",
    https: false,
    hotOnly: false, //热更新
    port: 80,
    // 配置跨域-请求后端的接口
    proxy: {
      // "/api": {
      //   target: "http://172.20.10.3:80", //对应自己的接口
      //   changeOrigin: true,
      //   ws: true,
      //   pathRewrite: {
      //     "^/api": ""
      //   }
      // }
    }
  },
  server:{
    host:'localhost' ,//ip地址
    port: 5175, // 设置服务启动端口号
    open: true, // 设置服务启动时是否自动打开浏览器
  }
});
