<template>
  <main dir="rtl">
    <router-view v-slot="{ Component }">
      <transition mode="out-in" name="slide-fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
</template>

<script lang="ts">
import { defineComponent, watch, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import useStore from "./stores/index";
import Something from "@something/something";

export default defineComponent({
  name: "App",
  setup() {
    const store = useStore();
    const route = useRoute();

    watch(
      () => route.query,
      (val) => {
        store.setRouteQueryParams(val);
        if (!store.getSample1Params.webToken) {
          const {
            WebToken: webToken = "",
            os = "webapp",
            cv = 0,
          } = route.query;
          const sample1Params: Sample1Params = {
            webToken: (webToken as string).replace(/ /g, "+"),
            os: os as OsTypes,
            cv: cv ? +cv : 0,
          };
          store.setSample1Params(sample1Params);
          sessionStorage.setItem(
            "sample1Params",
            JSON.stringify(sample1Params)
          );
        }
      }
    );

    onMounted(() => {
      (window as any).Something = new Something();
    });
    onUnmounted(() => {
      sessionStorage.removeItem("sample1Params");
    });

    return {};
  },
});
</script>

<style lang="scss">
#app {
  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateX(-30px);
    opacity: 0;
  }
  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition: all 0.3s ease-out;
  }
  .slide-fade-enter-to,
  .slide-fade-leave-from {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
