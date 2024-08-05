<template>
  <the-default>
    <template #body v-if="carPlaqueHistoryStore.getInfo.info">
      <div
        class="fixed left-0 right-0 shadow-level_3 pt-0.5 bg-twilight-050 h-[50px]"
      >
        <vt-tab
          :labels="items"
          :active-tab="tab + 1"
          @tab-clicked="setTab($event)"
        />
      </div>
      <div
        class="fixed left-0 right-0 top-[50px] overflow-y-auto"
        :class="[tab === 0 ? 'bottom-20' : 'bottom-0']"
      >
        <page-state
          v-if="
            carPlaqueHistoryStore.getInquiryList.length === 0 &&
            tab === 1 &&
            loaded
          "
          state="empty"
          :type="1"
          empty-txt="هنوز استعلامی انجام نشده"
          class="h-full"
        />
        <template v-else>
          <div v-show="tab === 0" class="text-start mx-3 mt-4">
            <div
              class="flex p-4 justify-between items-center bg-twilight-050 radius-10 shadow-level_1 text-twilight-800"
            >
              <div
                class="ml-1 flex items-center ellipsis component-text--body-medium--med"
              >
                <span
                  class="icon-car font-icon-size-medium text-twilight-800 ml-1"
                />{{ carPlaqueHistoryStore.getInfo.plaqueName || "بدون نام" }}
              </div>
              <vt-plate
                v-bind="{
                  type: 'car',
                  carPart1: +carPlaqueHistoryStore.getPlate.dis,
                  letter: carPlaqueHistoryStore.getPlate.letter,
                  carPart2: +carPlaqueHistoryStore.getPlate.pelak,
                  ir: +carPlaqueHistoryStore.getPlate.ir,
                  isDisabled: false,
                }"
              />
            </div>
            <div
              class="text-twilight-400 mb-0.5 mt-4 component-text--body-medium--bold"
            >
              اطلاعات مالک
            </div>
            <div class="bg-twilight-050 pb-4 shadow-level_1 radius-10">
              <div class="theme-text--body-small p-4 pb-0">
                <div
                  class="flex items-center text-sunshine-500 mb-1.5 component-text--body-small--med"
                >
                  <span
                    class="icon-info text-sunshine-500 font-icon-size-small ml-1"
                  />
                  توجه کنید
                </div>
                {{ carPlaqueHistoryStore.getInfo.info }}
              </div>
              <vt-divider :has-margin="true" class="my-4" />
              <vt-simple-input
                class="m-4"
                label="کد ملی صاحب پلاک"
                placeholder="کد ملی 10 رقمی"
                v-model="nationalCode"
                maxlength="10"
              />
              <vt-simple-input
                class="m-4 mb-0"
                label="شماره موبایل صاحب پلاک"
                placeholder="مثلا 09123456789"
                v-model="mobileNo"
                maxlength="11"
              />
            </div>
          </div>
          <div v-show="tab === 1 && loaded" class="text-start mx-3 mt-4">
            <div
              class="component-text--body-large--bold text-twilight-400 mb-0.5"
            >
              سوابق استعلام خودرو
            </div>
            <div
              v-for="(item, index) of carPlaqueHistoryStore.getInquiryList"
              :key="index"
              class="bg-twilight-050 radius-10 mb-4"
            >
              <div class="flex items-center justify-between p-4">
                <div class="flex items-center ellipsis ml-1">
                  <span
                    class="icon-car font-icon-size-medium text-twilight-800 ml-1"
                  />{{ item.plaqueName || "بدون نام" }}
                </div>
                <div class="flex items-center">
                  <vt-plate
                    v-bind="{
                      type: 'car',
                      carPart1: +carPlaqueHistoryStore.getPlate.dis,
                      letter: carPlaqueHistoryStore.getPlate.letter,
                      carPart2: +carPlaqueHistoryStore.getPlate.pelak,
                      ir: +carPlaqueHistoryStore.getPlate.ir,
                      isDisabled: false,
                    }"
                    class="w-full"
                  />
                  <span
                    class="icon-h_menu text-twilight-800 font-icon-size-medium mr-1"
                    @click="changeBtmSheetStatus(true, 'info', item)"
                  />
                </div>
              </div>
              <div
                v-for="(plaqueHistory, index2) of item.plaqueHistoryInfo"
                :key="index2"
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
                    {{ plaqueHistory.value || "نامشخص" }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
      <div v-show="tab === 0" class="fixed left-0 right-0 bottom-0 p-3">
        <vt-button
          label="ثبت و ادامه"
          type="primary"
          size="large"
          button-type="submit"
          icon=""
          :block="true"
          @click.prevent="getPayToken"
        />
      </div>
      <bottom-sheet
        :status="btmSheet.status"
        :persist="false"
        :title="btmSheet.title"
        @close-bottom-sheet="changeBtmSheetStatus($event)"
      >
        <template #body>
          <div
            v-if="btmSheet.type === 'guidance'"
            class="flex justify-center items-center p-3"
          ></div>
          <div
            v-else-if="
              (btmSheet.type === 'info' && btmSheet.text) ||
              btmSheet.type === 'delete'
            "
            class="text-center"
            :class="[btmSheet.type === 'info' ? 'p-3' : 'p-3 pt-6 pb-4']"
          >
            {{ btmSheet.text }}
          </div>
          <vt-button
            v-if="btmSheet.type === 'guidance'"
            class="m-3"
            label="متوجه شدم"
            type="primary"
            size="large"
            button-type="button"
            icon=""
            :block="true"
            @click="changeBtmSheetStatus(false)"
          />
          <div v-else-if="btmSheet.type === 'info'">
            <div
              class="flex justify-between items-center p-4 text-twilight-800 component-text--body-large--med"
              @click="getInquiry"
            >
              مشاهده جزئیات
              <span
                class="icon-chevron_left font-icon-size-medium text-twilight-400"
              />
            </div>
            <vt-divider :has-margin="true" />
            <div
              class="flex justify-between items-center p-4 pb-6 text-volcano-500 component-text--body-large--med"
              @click="openDeleteBtmSheet"
            >
              حذف استعلام
              <span
                class="icon-chevron_left font-icon-size-medium text-twilight-400"
              />
            </div>
          </div>
          <div v-else-if="btmSheet.type === 'delete'" class="flex m-3">
            <vt-button
              label="بله، حذف می‌کنم"
              type="primary"
              size="large"
              button-type="button"
              icon=""
              :block="true"
              @click="delteInquiry"
              class="w-full"
            />
          </div>
        </template>
      </bottom-sheet>
    </template>
  </the-default>
</template>

<script lang="ts">
import TheDefault from "../../../layouts/TheDefault.vue";
import {
  defineComponent,
  reactive,
  ref,
  onBeforeMount,
  onUnmounted,
  Ref,
} from "vue";
import useStore from "../../../stores/index";
import useCarPlaqueHistoryStore from "../../../stores/provider1/carPlaqueHistory";
import BottomSheet from "../../../components/BottomSheet.vue";
import PageState from "../../../components/PageState.vue";
import ExpansionPanel from "../../../components/ExpansionPanel.vue";
import {
  useNationalCodeRuleFunc,
  useMobileNoRuleFunc,
} from "../../../composables/rules";
import { useChangeRoute } from "../../../composables/router";

export default defineComponent({
  name: "CarPlaqueHistoryTheEntry",
  components: {
    TheDefault,
    BottomSheet,
    PageState,
    ExpansionPanel,
  },
  setup() {
    const store = useStore();
    const carPlaqueHistoryStore = useCarPlaqueHistoryStore();

    const tab: Ref<0 | 1> = ref(0);
    const items: ["استعلام جدید", "سوابق استعلام"] = reactive([
      "استعلام جدید",
      "سوابق استعلام",
    ]);
    const timer: Ref<Timeout> = ref(0);
    const nationalCode: StrRef = ref("");
    const mobileNo: StrRef = ref("");
    const timeout: BoolRef = ref(false);
    const btmSheet: {
      item: CarPlaqueHistoryGetInquiryListRes | null;
      title: string;
      type: "" | "guidance" | "info" | "delete";
      text: string;
      status: boolean;
    } = reactive({
      item: null,
      title: "",
      type: "",
      text: "",
      status: false,
    });
    const loaded: BoolRef = ref(false);

    const setTab = (tabNum: 0 | 1): void => {
      if (tabNum !== tab.value) {
        tab.value = tabNum;
        if (tabNum === 1) getInquiryList();
      }
    };
    const openDeleteBtmSheet = async (): Promise<void> => {
      await changeBtmSheetStatus(false);
      changeBtmSheetStatus(true, "delete");
    };
    const changeBtmSheetStatus = (
      flag: boolean,
      type: "" | "guidance" | "info" | "delete" = "",
      item: CarPlaqueHistoryGetInquiryListRes | null = null
    ) => {
      return new Promise((resolve) => {
        if (flag) {
          if (type) {
            btmSheet.type = type;
            switch (type) {
              case "guidance":
                btmSheet.title = "نمونه استعلام";
                break;
              case "info":
                if (item) {
                  btmSheet.item = { ...item };
                  btmSheet.title = "انتخاب فعالیت";
                }
                break;
              case "delete":
                btmSheet.title = "حذف تاریخچه پلاک";
                btmSheet.text = `از حذف تاریخچه پلاک خود اطمینان دارید؟`;
                break;
            }
          }
          btmSheet.status = flag;
          resolve(true);
        } else {
          btmSheet.status = flag;
          timer.value = setTimeout(() => {
            clearTimeout(timer.value);
            btmSheet.type = "";
            btmSheet.title = "";
            btmSheet.text = "";
            resolve(true);
          }, 550);
        }
      });
    };
    const getInfo = async (): Promise<void> => {
      try {
        if (!carPlaqueHistoryStore.getInfo.info) {
          await carPlaqueHistoryStore.callGetInfo();
          const plate = { ...carPlaqueHistoryStore.getPlate };
          plate.letter =
            carPlaqueHistoryStore.getInfo.plaqueTitle.split("-")[3];
          carPlaqueHistoryStore.setPlate(plate);
        }
      } catch (err) {
        console.error("Error in getInfo: ", err);
      }
    };
    const getInquiryList = async (): Promise<void> => {
      loaded.value = false;
      try {
        if (carPlaqueHistoryStore.getInquiryList.length === 0)
          await carPlaqueHistoryStore.callGetInquiryList();
      } catch (err) {
        console.error("Error in getInquiryList: ", err);
      }
      loaded.value = true;
    };
    const delteInquiry = async (): Promise<void> => {
      await changeBtmSheetStatus(false);
      const payload = { id: btmSheet.item?.id || "" };
      try {
        await carPlaqueHistoryStore.callDeleteInquiry(payload);
        store.setMessage({
          status: true,
          type: "success",
          title: "",
          text: "حذف تاریخچه پلاک با موفقیت انجام شد.",
          btnTxt: "",
        });
      } catch (err) {
        console.error("Error in deleteInquiry: ", err);
      }
    };
    const getInquiry = async (): Promise<void> => {
      const payload = { id: btmSheet.item?.id || "" };
      try {
        await carPlaqueHistoryStore.callGetInquiry(payload);
        useChangeRoute("CarPlaqueHistoryInquiryResult", false, {
          isPayment: false,
        });
      } catch (err) {
        console.error("Error in getInquiry: ", err);
      }
    };
    const getPayToken = async (): Promise<void> => {
      const { isValid: nationalCodeIsValid } = useNationalCodeRuleFunc(
        nationalCode.value
      );
      if (nationalCodeIsValid) {
        const { isValid: mobileNoIsValid } = useMobileNoRuleFunc(
          mobileNo.value
        );
        if (!mobileNoIsValid) {
          store.setMessage({
            status: true,
            type: "error",
            title: "",
            text: "لطفا شماره موبایل صاحب پلاک را اصلاح نمایید.",
            btnTxt: "",
          });
          return;
        }
      } else {
        store.setMessage({
          status: true,
          type: "error",
          title: "",
          text: "لطفا کد ملی صاحب پلاک را اصلاح نمایید.",
          btnTxt: "",
        });
        return;
      }
      const payload = {
        plaqueNo: carPlaqueHistoryStore.getPlate.query,
        mobileNo: +mobileNo.value,
        nationalCode: nationalCode.value,
      };
      try {
        await carPlaqueHistoryStore.callGetPayToken(payload);
        onPay();
      } catch (err) {
        console.error("Error in getPayToken: ", err);
      }
    };
    const onPay = async (): Promise<void> => {
      try {
        await store.callOnPay(carPlaqueHistoryStore.getPayToken);
        setPay();
      } catch (err) {
        console.error("Error in onPay: ", err);
      }
    };
    const setPay = async (): Promise<void> => {
      const { token: payToken } = carPlaqueHistoryStore.getPayToken;
      const payload = { payToken };
      try {
        await carPlaqueHistoryStore.callSetPay(payload);
        useChangeRoute("CarPlaqueHistoryInquiryResult", false, {
          isPayment: true,
        });
      } catch (err) {
        console.error("Error in setPay: ", err);
      }
    };
    const loadData = () => {
      tab.value = (+store.getRouteQueryParams.tab as 0 | 1) || 0;
      nationalCode.value = carPlaqueHistoryStore.getNationalCode || "";
      mobileNo.value = carPlaqueHistoryStore.getMobileNo || "";
      getInfo();
    };

    onBeforeMount(() => {
      loadData();
    });
    onUnmounted(() => {
      clearTimeout(timer.value);
    });

    return {
      store,
      carPlaqueHistoryStore,
      nationalCode,
      mobileNo,
      btmSheet,
      tab,
      items,
      loaded,
      timeout,
      changeBtmSheetStatus,
      openDeleteBtmSheet,
      getInquiry,
      getPayToken,
      delteInquiry,
      setTab,
    };
  },
});
</script>

<style scoped lang="scss">
:deep(.guidance-btn-con .v-button-con) {
  .v-button--link {
    color: $twilight_800;
    span {
      font-size: 13px;
      font-weight: 400;
    }
  }
}
:deep(.input-container input) {
  height: 46px;
}
</style>
