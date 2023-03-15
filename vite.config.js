import { defineConfig,loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from "unplugin-vue-components/vite"
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";

import {resolve} from "path"
// https://vitejs.dev/config/
export default ({mode})=>{
  const {VITE_PORT, VITE_HOST} = loadEnv(mode,process.cwd())
  // console.log("====="+mode+"==="+VITE_PORT);
  return defineConfig({
    appType:"spa",
    plugins: [
      vue({
        refTransform:true
      }),
      Components({
        dts:true,
        resolvers:[
          AntDesignVueResolver()
        ]
      })
    ],
    root:resolve(__dirname,"src/pages"),
    
    publicDir:resolve(__dirname,"public"),
    base:"/louapp/dist",
    resolve:{
      alias:[
        {
          find:"@", replacement:resolve(__dirname,"./src")
        },
        {
          find:"~", replacement:resolve(__dirname,"../")
        },
      ]
    },
    envDir:resolve(__dirname,"./"),
    esbuild:{
      drop:(mode=="production")?["console","debugger"]:[],
    },
    server:{
      host:VITE_HOST,
      port:VITE_PORT,
    },
    preview:{
      host:VITE_HOST,
      port:VITE_PORT,
    },
    build:{
      outDir:resolve(__dirname,"dist"),
      rollupOptions:{
        input:{
          main:resolve(__dirname,"./src/pages/index.html"),
          lou:resolve(__dirname,"./src/pages/lou.html"),
          area:resolve(__dirname,"./src/pages/area.html")
        }
      }
    }
  })
}