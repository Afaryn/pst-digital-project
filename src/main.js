import "./assets/main.css";
import "bootstrap/dist/css/bootstrap.css";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const vue = createApp(App);

vue.use(router);
vue.mount("#app");
vue.use(bootstrap);
