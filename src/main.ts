import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import { createPinia } from "pinia";
import VT from "@sample1/ui-kit";

const pinia = createPinia();
const app = createApp(App);
app.use(router).use(pinia).use(VT).mount("#app");
