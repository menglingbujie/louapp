import { createApp } from 'vue'
// import { createPinia} from "pinia"
import './style.css'
import router from "./router_lou";
import App from './App.vue'
// const pinia = createPinia();
const app = createApp(App);
// app.use(router).use(pinia).mount('#lou')
app.use(router).mount('#lou')
