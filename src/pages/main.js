import { createApp } from 'vue'
import { createPinia} from "pinia"
import './style.css'
// import "ant-design-vue/dist/antd.less";
import router from "./router";
import App from './App.vue'
const pinia = createPinia();
const app = createApp(App);
app.use(router).use(pinia).mount('#lou')
