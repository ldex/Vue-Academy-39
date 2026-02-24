import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import HomeView from "@/views/HomeView.vue";
import ProductDetailsView from '@/views/ProductDetailsView.vue';
import ErrorView from "@/views/ErrorView.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: () => import('../views/AboutView.vue')
  },
  {
    path: "/products",
    name: "products",
    component: () => import('../views/ProductsView.vue')
  },
  {
      path: '/product/:id',
      name: 'product',
      component: ProductDetailsView,
      props: castRouteParamsId
  },
  {
    path: "/:pathMatch(.*)*",
    name: "error",
    component: ErrorView,
  },
];

function castRouteParamsId(route: any) {
  return {
    id: Number(route.params.id),
  };
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
