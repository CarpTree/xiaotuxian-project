import "@/styles/common.scss";

import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersestedState from "pinia-plugin-persistedstate";

import App from "./App.vue";
import router from "./router";
import { lazyPlugin } from "./directives";
import { componentPlugin } from "./components/index";

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersestedState);

app.use(pinia);
app.use(router);
app.use(lazyPlugin);
app.use(componentPlugin);

app.mount("#app");
