import { createRouter, createWebHistory } from "vue-router";
import provider1Routes from "./provider1/index";

const routes = [...provider1Routes];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
