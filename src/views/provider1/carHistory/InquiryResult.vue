<template>
  <the-default>
    <template #body>
      <div v-if="item">
        <div
          class="fixed left-0 right-0 top-0 bottom-20 overflow-y-auto px-3 pt-4 text-start"
        >
          <div
            class="bg-twilight-050 flex items-center p-4 pr-3 radius-10 mb-4"
          >
            <div
              :class="[
                item.isTransferable ? 'bg-[#00a6881a]' : 'bg-[#ff68611a]',
                'p-2 ml-2 radius-14 flex',
              ]"
            >
              <span
                :class="[
                  item.isTransferable
                    ? 'text-[#00a688] icon-tick_box'
                    : 'text-[#ff6861] icon-error_box',
                  'font-icon-size-xlarge',
                ]"
              />
            </div>
            <div class="component-text--body-large--bold text-twilight-800">
              {{ item.isTransferable ? "" : "غیر" }} قابل نقل و انتقال
              <div class="component-text--body-medium--reg text-twilight-500">
                تاریخ استعلام: {{ item.inquiryDate }}
              </div>
            </div>
          </div>
          <div v-if="!item.isTransferable && item.transactionInfo?.length > 0">
            <span class="component-text--body-large--bold text-twilight-400">
              اطلاعات تراکنش
            </span>
            <div class="mt-1 bg-twilight-050 radius-10">
              <div
                v-for="(tranaction, index) of item.transactionInfo"
                :key="index"
              >
                <vt-divider v-if="index !== 0" :has-margin="true" />
                <div class="flex items-center p-4">
                  <div
                    class="flex-shrink text-twilight-500 component-text--body-medium--med"
                  >
                    {{ tranaction.key }}
                  </div>
                  <div
                    class="flex-grow w-min text-twilight-700 theme-text--label-small text-end"
                  >
                    {{ tranaction.value || "نامشخص" }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="item.isTransferable && item.vehicleInfo?.length > 0"
            class="mb-4"
          >
            <span class="component-text--body-large--bold text-twilight-400">
              اطلاعات خودرو
            </span>
            <div class="mt-1 bg-twilight-050 radius-10">
              <div v-for="(vehicle, index) of item.vehicleInfo" :key="index">
                <vt-divider v-if="index !== 0" :has-margin="true" />
                <div class="flex items-center p-4">
                  <div
                    class="flex-shrink text-twilight-500 component-text--body-medium--med"
                  >
                    {{ vehicle.key }}
                  </div>
                  <div
                    class="flex-grow w-min text-twilight-700 theme-text--label-small text-end"
                  >
                    {{ vehicle.value || "نامشخص" }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="item.isTransferable && item.insuranceInfo" class="mb-4">
            <span class="component-text--body-large--bold text-twilight-400">
              اطلاعات بیمه
            </span>
            <div class="mt-1 bg-twilight-050 radius-10">
              <div class="flex items-center p-4">
                <div
                  class="flex-shrink text-twilight-500 component-text--body-medium--med"
                >
                  تاریخ پایان بیمه
                </div>
                <div
                  class="flex-grow w-min text-twilight-700 theme-text--label-small text-end"
                >
                  {{ item.insuranceInfo.end || "-" }}
                </div>
              </div>
              <vt-divider :has-margin="true" />
              <div class="flex items-center p-4">
                <div
                  class="flex-shrink text-twilight-500 component-text--body-medium--med"
                >
                  تاریخ شروع بیمه
                </div>
                <div
                  class="flex-grow w-min text-twilight-700 theme-text--label-small text-end"
                >
                  {{ item.insuranceInfo.start || "-" }}
                </div>
              </div>
              <vt-divider
                v-if="item.insuranceInfo.report?.length > 0"
                :has-margin="true"
              />
              <expansion-panel
                v-if="item.insuranceInfo.report?.length > 0"
                class="p-4"
                :open-by-default="false"
              >
                <template #header>
                  <div
                    class="text-twilight-500 component-text--body-medium--med"
                  >
                    پرداخت‌های بیمه
                  </div>
                </template>
                <template #content>
                  <ul class="pl-0">
                    <li
                      v-for="(rep, index) of item.insuranceInfo.report"
                      :key="index"
                      class="component-text--body-medium--reg text-twilight-500 list-none"
                    >
                      <vt-divider
                        v-if="index !== 0"
                        :has-margin="false"
                        class="my-4"
                      />
                      <div class="flex items-center">
                        •
                        {{ rep.message }}
                      </div>
                    </li>
                  </ul>
                </template>
              </expansion-panel>
            </div>
          </div>
          <div v-if="item.isTransferable && item.debtInfo?.length > 0">
            <span class="component-text--body-large--bold text-twilight-400">
              اطلاعات بدهی
            </span>
            <div class="mt-1 bg-twilight-050 radius-10">
              <div v-for="(debt, index) of item.debtInfo" :key="index">
                <vt-divider v-if="index !== 0" :has-margin="true" />
                <div class="flex items-center p-4">
                  <div
                    class="flex-shrink text-twilight-500 component-text--body-medium--med"
                  >
                    {{ debt.key }}
                  </div>
                  <div
                    class="flex-grow w-min text-twilight-700 theme-text--label-small text-end"
                  >
                    {{ debt.value || "نامشخص" }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="fixed left-0 right-0 bottom-0 p-3">
          <vt-button
            label="برو به خانه"
            type="primary"
            size="large"
            button-type="button"
            icon="home"
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
import useCarHistoryStore from "../../../stores/provider1/carHistory";
import ExpansionPanel from "../../../components/ExpansionPanel.vue";
// import { useChangeRoute } from "../../../composables/router";

export default defineComponent({
  name: "CarHistoryInquiryResult",
  components: {
    TheDefault,
    ExpansionPanel,
  },
  setup() {
    const store = useStore();
    const carHistoryStore = useCarHistoryStore();

    const item: Ref<CarHistoryGetInquiryRes | null> = ref(null);

    const goHome = (): void => {
      //   useChangeRoute("CarHistoryTheEntry", true, { tab: 1 });
      (window as any).Something.home();
    };

    onBeforeMount(() => {
      item.value =
        store.getRouteQueryParams.isPayment == "false"
          ? carHistoryStore.getInquiry
          : carHistoryStore.getPayResult;
    });

    return { item, goHome };
  },
});
</script>
