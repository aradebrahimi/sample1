<template>
  <div>
    <router-view />
  </div>
</template>

<script lang="ts">
import TheDefault from "../../../layouts/TheDefault.vue";
import { defineComponent, onBeforeMount } from "vue";
import useStore from "../../../stores/index";
import useCarHistoryStore from "../../../stores/provider1/carHistory";

export default defineComponent({
  name: "CarHistoryIndex",
  components: {
    TheDefault,
  },
  setup() {
    const store = useStore();
    const carHistoryStore = useCarHistoryStore();

    onBeforeMount(() => {
      let plaque = store.getRouteQueryParams.plaque || "";
      if (plaque != "null") {
        if (plaque.length === 8)
          plaque = plaque.substring(0, 2) + "0" + plaque.substring(2, 8);
        const plate = {
          dis: plaque.slice(0, 2),
          letter: "",
          pelak: plaque.slice(4, 7),
          ir: plaque.slice(7, 9),
          query: plaque,
        };
        carHistoryStore.setPlate(plate);
      }
    });
  },
});
</script>
