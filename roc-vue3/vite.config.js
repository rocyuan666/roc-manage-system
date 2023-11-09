import { defineConfig, loadEnv } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import createVitePlugins from './vite/plugins'

export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, fileURLToPath(new URL('./', import.meta.url)))
  const { VITE_APP_ENV, VITE_APP_PROXY, VITE_APP_BASE_API } = env

  const viteConfig = {
    base: VITE_APP_ENV === 'production' ? './' : './',
    resolve: {
      alias: {
        '~': fileURLToPath(new URL('./', import.meta.url)),
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      chunkSizeWarningLimit: 1024,
      rollupOptions: {
        output: {
          manualChunks: {
            quill: ['quill'],
            elementPlusIcon: ['@element-plus/icons-vue'],
            elementPlus: ['element-plus'],
          },
        },
      },
    },
    esbuild: {
      drop: mode === 'production' ? ['console', 'debugger'] : [],
    },
    server: {
      port: 8080,
      host: true,
      open: true,
      proxy: {
        '/api': {
          target: VITE_APP_BASE_API,
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/api/, ''),
        },
      },
    },
    css: {
      postcss: {
        plugins: [
          {
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === 'charset') {
                  atRule.remove()
                }
              },
            },
          },
        ],
      },
    },
    plugins: createVitePlugins(env, command === 'build'),
  }

  if (mode === 'development') {
    if (VITE_APP_PROXY === 'false') {
      delete viteConfig.server.proxy
    }
  }

  return viteConfig
})
