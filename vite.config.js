import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    react(),
    // Compresión gzip
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz'
    }),
    // Compresión brotli (mejor que gzip)
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'brotliCompress',
      ext: '.br'
    })
  ],
  build: {
    // Optimizaciones de build
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Elimina console.logs en producción
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug']
      }
    },
    // Code splitting para mejor cache
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
        },
        // Nombres de archivos con hash para cache busting
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    // Chunks más pequeños
    chunkSizeWarningLimit: 1000,
    // Sourcemaps solo para desarrollo
    sourcemap: false,
    // Optimización de CSS
    cssCodeSplit: true,
    // Target moderno para mejor optimización
    target: 'es2015',
    // Prefetch de módulos
    modulePreload: {
      polyfill: true
    }
  },
  // Optimizaciones de dev
  server: {
    hmr: {
      overlay: false
    }
  }
})
