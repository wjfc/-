import Vue from "vue";
import VueRouter from "vue-router";
import { getLocalStorage } from "@/utils/localStorage";
import { MessagePlugin } from "tdesign-vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/index"
  },
  {
    path: "/index",
    component: () => import('@/pages/index/Index.vue'),
  },
  {
    path: "/login",
    component: () => import('@/pages/index/Login.vue'),
  },
  {
    path: "/test",
    component: () => import('@/pages/index/Test.vue'),
  },
  {
    path: "/video",
    component: () => import('@/pages/index/VideoTest.vue'),
  }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  let userInfo = getLocalStorage("userInfo");
  let autoLogin = getLocalStorage("autoLogin");
  if (to.path != "/login") {
    if (!userInfo) {
      next("/login")
    } else {
      next();
    }
  } else {
    if (autoLogin && userInfo) {
      MessagePlugin.success("自动登录")
      next("/index");
    } else {
      next();
    }
  }
})

export default router;
