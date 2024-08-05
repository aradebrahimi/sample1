<template>
  <the-default>
    <template #body>
      <div v-if="item">
        <div
          class="fixed left-0 right-0 top-0 bottom-20 overflow-y-auto px-3 pt-4 text-start"
        >
          <div class="bg-twilight-050 radius-10 mb-1">
            <div class="flex items-center justify-between p-4">
              <div class="flex items-center ellipsis ml-1">
                <span
                  class="icon-car font-icon-size-medium text-twilight-800 ml-1"
                />{{ item.plaqueName || "بدون نام" }}
              </div>
              <vt-plate
                v-bind="{
                  type: 'car',
                  carPart1: +item.plaqueTitle.split('-')[4],
                  letter: item.plaqueTitle.split('-')[3],
                  carPart2: +item.plaqueTitle.split('-')[2],
                  ir: +item.plaqueTitle.split('-')[0],
                  isDisabled: false,
                }"
              />
            </div>
            <div
              v-for="(plaqueHistory, index) of item.plaqueHistoryInfo[0]"
              :key="index"
            >
              <vt-divider :has-margin="true" />
              <div class="flex items-center p-4">
                <div
                  class="flex-shrink ellipsis text-twilight-500 component-text--body-medium--med"
                >
                  {{ plaqueHistory.key }}
                </div>
                <div
                  class="flex-grow text-twilight-700 theme-text--label-small text-end"
                >
                  {{ plaqueHistory.value }}
                </div>
              </div>
            </div>
          </div>
          <template v-if="item.plaqueHistoryInfo && detailsList.length > 0">
            <div
              v-for="(plaqueHistory, index) of detailsList"
              :key="index"
              class="bg-twilight-050 radius-10 mt-4 mb-1"
            >
              <div v-for="(d, index2) of plaqueHistory" :key="index2">
                <vt-divider v-if="index2 !== 0" :has-margin="true" />
                <div class="flex items-center p-4">
                  <div
                    class="flex-shrink ellipsis text-twilight-500 component-text--body-medium--med"
                  >
                    {{ d.key }}
                  </div>
                  <div
                    class="flex-grow text-twilight-700 theme-text--label-small text-end"
                  >
                    {{ d.value || "نامشخص" }}
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
        <div class="fixed left-0 right-0 bottom-0 p-3">
          <vt-button
            label="بازگشت"
            type="primary"
            size="large"
            button-type="button"
            icon=""
            :block="true"
            @click="goHome"
          />
        </div>
      </div>
    </template>
  </the-default>
</template>

<script lang="ts">
import TheDefault from "../../../layouts/TheDefault.vue";
import { defineComponent, ref, onBeforeMount, Ref } from "vue";
import useStore from "../../../stores/index";
import useCarPlaqueHistoryStore from "../../../stores/provider1/carPlaqueHistory";
// import { useChangeRoute } from "../../../composables/router";

export default defineComponent({
  name: "CarPlaqueHistoryInquiryResult",
  components: {
    TheDefault,
  },
  setup() {
    const store = useStore();
    const carPlaqueHistoryStore = useCarPlaqueHistoryStore();

    const item: Ref<CarPlaqueHistoryGetInquiryRes | null> = ref(null);
    const detailsList: Ref<KeyValueRes[][]> = ref([]);

    const goHome = (): void => {
      //   useChangeRoute("CarHistoryTheEntry", true, { tab: 1 });
      (window as any).Something.home();
    };

    onBeforeMount(() => {
      item.value =
        store.getRouteQueryParams.isPayment == "false"
          ? carPlaqueHistoryStore.getInquiry
          : carPlaqueHistoryStore.getPayResult;
      detailsList.value = item.value.plaqueHistoryInfo.slice(1);
    });

    return { item, goHome, detailsList };
  },
});
</script>
