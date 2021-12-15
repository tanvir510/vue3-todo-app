import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

/*=============================================
---------------- Plugin Import -----------------
===============================================*/
import axios from "./plugins/axios";
import components from "./plugins/components";

/*=============================================
---------------- Style Import -----------------
===============================================*/
import "./assets/sass/app.scss";
import "./assets/css/main.css";

createApp(App).use(axios).use(components).use(store).use(router).mount("#app");
