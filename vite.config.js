import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { viteMockServe } from 'vite-plugin-mock'
import { visualizer } from 'rollup-plugin-visualizer'
import { setting } from './src/config/setting'

const {
  base,
  publicDir,
  outDir,
  assetsDir,
  sourcemap,
  cssCodeSplit,
  host,
  port,
  strictPort,
  open,
  cors,
  brotliSize,
  logLevel,
  clearScreen,
  drop_console,
  drop_debugger,
  chunkSizeWarningLimit,
} = setting

const isDev = process.env.NODE_ENV === 'development'
// https://vitejs.dev/config/
export default defineConfig({
  root: process.cwd(),
  base,
  publicDir,
  logLevel,
  clearScreen,
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
    }),
    // mock插件
    viteMockServe({
      mockPath: 'mock',
      supportTs: false,
      localEnabled: isDev,
      prodEnabled: !isDev,
      injectCode: `
      import { setupProdMockServer } from './mockProdServer';
      setupProdMockServer();
    `,
    }),
    visualizer({
      emitFile: false,
      file: 'stats.html', //分析图生成的文件名
      open: false, //如果存在本地服务端口，将在打包后自动展示
    }),
  ],
  server: {
    host,
    port,
    cors,
    strictPort,
    open,
    fs: {
      strict: false,
    },
  },
  resolve: {
    // 设置别名
    alias: {
      // views: path.resolve(__dirname, 'src/views'),
      // styles: path.resolve(__dirname, 'src/styles'),
      '@': resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      // 引入公用的样式,这样可以使用sass的全局变量
      scss: {
        additionalData: `@use "@/assets/styles/index.scss" as *; @use "@/assets/styles/element/index.scss" as *;`,
        charset: false,
      },
    },
  },
  build: {
    target: 'es2015',
    outDir,
    assetsDir,
    sourcemap,
    cssCodeSplit,
    brotliSize,
    terserOptions: {
      compress: {
        keep_infinity: true,
        drop_console,
        drop_debugger,
      },
    },
    rollupOptions: {
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        manualChunks(id) {
          //静态资源分拆打包
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString()
          }
        },
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
})
