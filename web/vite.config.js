// https://vitejs.dev/config/
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import AutoImport from "unplugin-auto-import/vite"
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import path from 'path'
import vueJsx from '@vitejs/plugin-vue-jsx';

export default defineConfig({
  plugins: [
    vue({
      script:{
        defineModel: true
      }
    }), // 启用 Vue 插件
    vueJsx(), // 启用 JSX 支持
    Components({
      resolvers: [
        AntDesignVueResolver({importStyle: false, resolveIcons:true}),// 使用 Ant Design Vue 组件库的解析器，不使用 CSS in JS
      ],
      dirs: ['src/components'], // 自动引入组件的目录
      extensions: ['vue'], // 指定需要自动引入的文件扩展名
      dts: true, // 生成 TypeScript 声明文件
      deep: true // 遍历子目录以查找组件
    }),
    AutoImport({
      imports: [
        'vue', // 自动导入 Vue API
        'vue-router', // 自动导入 Vue Router API
        {
          '@antv/g2': ['Chart'], //导入chart
          // 自动导入自定义模块的函数
          '@/common/js/utils.js': [['getRandomColorCode', 'getRandomColorCode'], ['conversionTime', 'conversionTime']],
        },
      ],
      dts: 'src/auto-import.d.ts', // 生成的自动导入声明文件路径
      resolvers: [AntDesignVueResolver()] // 使用 Ant Design Vue 的解析器
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler" // or 'modern'
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // src 目录别名
      '@view': path.resolve(__dirname, './src/view'), // 视图目录别名
      '@common': path.resolve(__dirname, './src/common'), // 公共目录别名
      '@components': path.resolve(__dirname, './src/components'), // 组件目录别名
      '@stores': path.resolve(__dirname, './src/stores'), // 状态管理目录别名
      '@assets': path.resolve(__dirname, './src/assets'), // 资源目录别名
      '@request': path.resolve(__dirname, './src/request') // 请求模块目录别名
    }
  },
  server: {
    host: 'localhost', // 本地开发服务器地址
    port: 5175, // 开发服务器端口号
    open: true, // 启动时自动打开浏览器
    https: false, // 是否启用 HTTPS
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
