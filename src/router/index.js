import { createRouter, createWebHistory } from "vue-router";

// Module Import
import UserPanel from "./users/index";

// Component Import
import Home from "../views/Home.vue";

const routes = [
  ...UserPanel,
  {
    path: "/",
    name: "Home",
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
