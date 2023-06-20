import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { VitePluginFonts } from 'vite-plugin-fonts'

import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import ElementPlus from 'unplugin-element-plus/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { fontOptions } from './src/assets/styles/font/fonts.js'

export default defineConfig({
    server: {
        host: true,
        port: 3000,
        strictPort: true,
        // open: true,
    },
    preview: {
        port: 3000,
    },
    plugins: [
        vue(),
        VitePluginFonts(fontOptions),
        ElementPlus({
            useSource: true,
        }),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
    ],
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use "./src/assets/styles/element/index.scss" as *;`,
            },
        },
    },
})
