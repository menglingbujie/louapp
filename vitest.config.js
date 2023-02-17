import { mergeConfig } from "vite";
import {defineConfig} from "vitest/config"
import viteConfig from "./vite.config";
import vue from '@vitejs/plugin-vue'
export default mergeConfig(viteConfig,defineConfig({
  plugins:[
    vue({
      refTransform:true
    })
  ],
  test:{
    environment:"happy-dom",
  }
}));