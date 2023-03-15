import { createApp } from 'vue'
// import { createPinia} from "pinia"
import './style.css'
import router from "./router_area";
import App from './App.vue'
// const pinia = createPinia();
const app = createApp(App);
// app.use(router).use(pinia).mount('#area')
app.use(router).mount('#area')
