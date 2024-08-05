<template>
  <the-default>
    <template #body v-if="carHistoryStore.getInfo.message">
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
            carHistoryStore.getInquiryList.length === 0 && tab === 1 && loaded
          "
          state="empty"
          :type="1"
          empty-txt="هنوز استعلامی انجام نشده"
          class="h-full"
        />
        <div v-else>
          <div
            v-show="tab === 0"
            class="text-start bg-twilight-050 radius-10 mx-3 mt-4 shadow-level_1"
          >
            <div class="theme-text--body-small p-4 pb-0">
              <div
                class="flex items-center text-sunshine-500 mb-0.5 component-text--body-small--med"
              >
                توضیحات
              </div>
              {{ carHistoryStore.getInfo.message }}
              <div dir="ltr">
                <div
                  class="mt-0.5 w-fit guidance-btn-con"
                  style="border-bottom: 1px solid black"
                >
                  <vt-button
                    label="نمونه استعلام"
                    type="link"
                    size="small"
                    button-type="button"
                    icon=""
                    :block="false"
                    class="theme-text--body-small"
                    @click="changeBtmSheetStatus(true, 'guidance')"
                  />
                </div>
              </div>
            </div>
            <vt-divider :has-margin="true" class="my-4" />
            <span
              class="component-text--body-medium--bold text-twilight-400 mx-4"
            >
              انتخاب نوع استعلام
            </span>
            <div class="pb-4 pt-2">
              <div
                class="px-4 theme-text--body-large text-twilight-800 flex flex-wrap items-center"
              >
                <div
                  v-for="(type, index) of radioItems"
                  :key="index"
                  class="flex items-center justify-start gap-2 pt-2 ml-4"
                  :class="[index === 0 ? 'ml-4' : '']"
                  role="button"
                  @click="setRadioVal(type.id)"
                >
                  <vt-radio
                    :key="type.selected"
                    :init-value="type.selected"
                    :label-clicked="type.selected.toString()"
                  />
                  <div class="flex flex-col items-start justify-start">
                    {{ type.title }}
                  </div>
                </div>
              </div>
              <div
                v-show="selectedMethod === 0"
                class="mt-6 mx-4 relative barcode-bookletNumber-btn-con"
              >
                <vt-button
                  label="راهنما بارکد"
                  type="link"
                  size="small"
                  button-type="button"
                  icon="info"
                  :block="false"
                  class="component-text--body-small--med absolute left-0 right-auto"
                  @click="changeBtmSheetStatus(true, 'barcode')"
                />
                <vt-simple-input
                  label="بارکد خودرو"
                  placeholder="کد 9 رقمی پشت کارت خودرو"
                  v-model="barcode"
                  maxlength="9"
                />
              </div>
              <div
                v-show="selectedMethod === 1"
                class="mt-6 mx-4 relative barcode-bookletNumber-btn-con"
              >
                <vt-button
                  label="راهنما برگه سبز"
                  type="link"
                  size="small"
                  button-type="button"
                  icon="info"
                  :block="false"
                  class="component-text--body-small--med absolute left-0 right-auto"
                  @click="changeBtmSheetStatus(true, 'bookletNumber')"
                />
                <vt-simple-input
                  label="شماره برگه سبز"
                  placeholder="کد 14 رقمی روی برگه سبز"
                  v-model="bookletNumber"
                  maxlength="14"
                />
              </div>
              <vt-simple-input
                class="m-4"
                label="کد ملی مالک خودرو"
                placeholder="کد ملی 10 رقمی"
                v-model="sellerNationalCode"
                maxlength="10"
              />
              <vt-divider :has-margin="true" />
              <expansion-panel class="mt-4 mx-4" :open-by-default="false">
                <template #header>
                  <div
                    class="theme-text--body-small text-justify text-twilight-400"
                  >
                    <div
                      class="component-text--body-medium--med text-twilight-600"
                    >
                      کد ملی خریدار
                    </div>
                    (در صورت داشتن اطلاعات خریدار این فیلد را تکمیل کنید)
                  </div>
                </template>
                <template #content>
                  <vt-simple-input
                    label="کد ملی خریدار"
                    placeholder="کد ملی 10 رقمی"
                    v-model="buyerNationalCode"
                    maxlength="10"
                  />
                </template>
              </expansion-panel>
            </div>
          </div>
          <div v-show="tab === 1 && loaded" class="text-start mx-3 my-4">
            <span class="component-text--body-large--bold text-twilight-400">
              سوابق استعلام خودرو
            </span>
            <div class="bg-twilight-050 radius-10 mt-2">
              <div
                v-for="(item, index) of carHistoryStore.getInquiryList"
                :key="index"
              >
                <vt-divider v-if="index !== 0" :has-margin="true" />
                <div class="flex items-center justify-between p-4">
                  <div class="flex items-center">
                    <div
                      class="p-2 ml-2 radius-14"
                      :class="[
                        item.isTransferable
                          ? 'bg-[#00a6881a]'
                          : 'bg-[#ff68611a]',
                      ]"
                    >
                      <span
                        :class="[
                          item.isTransferable
                            ? 'icon-tick_box text-[#00a688]'
                            : 'icon-error_box text-[#ff6861]',
                          'font-icon-size-xlarge',
                        ]"
                      />
                    </div>
                    <div
                      class="component-text--body-large--bold text-twilight-800"
                    >
                      {{ item.title }}
                      <div
                        class="component-text--body-medium--reg text-twilight-500"
                      >
                        تاریخ استعلام: {{ item.inquiryDate || "نامشخص" }}
                      </div>
                    </div>
                  </div>
                  <span
                    class="icon-h_menu text-twilight-800 font-icon-size-medium"
                    @click="changeBtmSheetStatus(true, 'info', item)"
                  />
                </div>
                <div class="p-4 pt-0">
                  <div
                    class="px-3 py-1 tag-typo radius-8 w-fit"
                    :class="[
                      item.isTransferable
                        ? 'text-aurora-500 bg-[#00a6881a]'
                        : 'text-volcano-500 bg-[#ff68611a]',
                    ]"
                  >
                    {{ item.isTransferable ? "" : "غیر" }} قابل انتقال
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-show="tab === 0" class="fixed left-0 right-0 bottom-0 p-3">
        <vt-button
          label="ثبت و ادامه"
          type="primary"
          size="large"
          button-type="submit"
          icon=""
          :block="true"
          @click.prevent="sendOtp"
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
            v-if="
              btmSheet.type === 'barcode' ||
              btmSheet.type === 'bookletNumber' ||
              btmSheet.type === 'guidance'
            "
            class="flex justify-center items-center p-3"
          >
            <img
              v-if="btmSheet.type === 'barcode'"
              src="../../../assets/img/car-history/barcode.png"
              alt="image"
              class="w-full max-w-[400px]"
            />
            <img
              v-else-if="btmSheet.type === 'bookletNumber'"
              src="../../../assets/img/car-history/booklet-number.png"
              alt="image"
              class="w-full max-w-[400px]"
            />
            <img
              v-else
              src="../../../assets/img/car-history/guidance.png"
              alt="image"
              class="w-full max-w-[400px]"
            />
          </div>
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
          <div v-else-if="btmSheet.type === 'otp'" class="p-3 pb-1">
            <div class="text-center">
              {{ btmSheet.text }}
            </div>
            <div
              v-if="!timeout"
              class="pt-1 pb-4 text-center text-twilight-500 component-text--label-small--med"
            >
              ({{ ("0" + min).slice(-2) }}:{{ ("0" + second).slice(-2) }}) تا
              ارسال کد
            </div>
            <div v-else class="pt-1 pb-4 flex justify-center">
              <vt-button
                label="ارسال مجدد"
                type="link"
                size="small"
                class="w-fit"
                button-type="button"
                icon=""
                :block="false"
                @click="resendOtp"
              />
            </div>
            <vt-simple-input
              label="کد یکبار مصرف"
              placeholder="کد 6 رقمی"
              v-model="otp"
              maxlength="6"
            />
            <div v-if="showOtpError" class="text-volcano-500 mt-2 text-center">
              لطفا کد ارسالی را کامل وارد نمایید
            </div>
          </div>
          <vt-button
            v-if="
              btmSheet.type === 'barcode' ||
              btmSheet.type === 'bookletNumber' ||
              btmSheet.type === 'guidance'
            "
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
          <vt-button
            v-else-if="btmSheet.type === 'otp'"
            label="تایید و ادامه"
            type="primary"
            size="large"
            class="m-3"
            button-type="button"
            icon=""
            :block="true"
            @click="getPayToken"
          />
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
import useCarHistoryStore from "../../../stores/provider1/carHistory";
import BottomSheet from "../../../components/BottomSheet.vue";
import PageState from "../../../components/PageState.vue";
import ExpansionPanel from "../../../components/ExpansionPanel.vue";
import { useNationalCodeRuleFunc } from "../../../composables/rules";
import { useChangeRoute } from "../../../composables/router";

export default defineComponent({
  name: "CarHistoryTheEntry",
  components: {
    TheDefault,
    BottomSheet,
    PageState,
    ExpansionPanel,
  },
  setup() {
    const store = useStore();
    const carHistoryStore = useCarHistoryStore();

    const tab: Ref<0 | 1> = ref(0);
    const items: ["استعلام جدید", "سوابق استعلام"] = reactive([
      "استعلام جدید",
      "سوابق استعلام",
    ]);
    const timer: Ref<Timeout> = ref(0);
    const selectedMethod: Ref<0 | 1> = ref(0);
    const barcode: Ref<string | null> = ref(null);
    const bookletNumber: Ref<string | null> = ref(null);
    const sellerNationalCode: StrRef = ref("");
    const buyerNationalCode: StrRef = ref("");
    const timeout: BoolRef = ref(false);
    const min: NumRef = ref(1);
    const second: NumRef = ref(59);
    const otp: StrRef = ref("");
    const timer2: Ref<Timeout> = ref(0);
    const btmSheet: {
      item: CarHistoryGetInquiryListRes | null;
      title: string;
      type:
        | ""
        | "barcode"
        | "bookletNumber"
        | "guidance"
        | "info"
        | "otp"
        | "delete";
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
    const showOtpError: BoolRef = ref(false);
    const radioItems: {
      id: 0 | 1;
      title: "بارکد کارت خودرو" | "شماره برگ سبز خودرو";
      selected: boolean;
    }[] = reactive([
      {
        id: 0,
        title: "بارکد کارت خودرو",
        selected: true,
      },
      {
        id: 1,
        title: "شماره برگ سبز خودرو",
        selected: false,
      },
    ]);

    const setTab = (tabNum: 0 | 1): void => {
      if (tabNum !== tab.value) {
        tab.value = tabNum;
        if (tabNum === 1) getInquiryList();
      }
    };
    const setRadioVal = (id) => {
      radioItems.forEach((i) => (i.selected = false));
      radioItems
        .filter((p) => p.id == id)
        .forEach((i) => {
          i.selected = true;
          selectedMethod.value = i.id;
        });
    };
    const initTimeout = (): void => {
      clearInterval(timer2.value);
      timeout.value = false;
      min.value = 1;
      second.value = 59;
      timer2.value = setInterval(() => {
        if (min.value === 0 && second.value === 0) {
          clearInterval(timer2.value);
          timeout.value = true;
          return;
        }
        if (min.value > 0 || second.value > 0) {
          if (second.value > 0) second.value = second.value - 1;
          else {
            min.value = min.value - 1;
            second.value = 59;
          }
        }
      }, 1000);
    };
    const openDeleteBtmSheet = async (): Promise<void> => {
      await changeBtmSheetStatus(false);
      changeBtmSheetStatus(true, "delete");
    };
    const changeBtmSheetStatus = (
      flag: boolean,
      type:
        | ""
        | "barcode"
        | "bookletNumber"
        | "guidance"
        | "info"
        | "otp"
        | "delete" = "",
      item: CarHistoryGetInquiryListRes | null = null
    ) => {
      return new Promise((resolve) => {
        if (flag) {
          if (type) {
            btmSheet.type = type;
            switch (type) {
              case "barcode":
                btmSheet.title = "راهنما بارکد";
                break;
              case "bookletNumber":
                btmSheet.title = "راهنما برگه سبز";
                break;
              case "guidance":
                btmSheet.title = "نمونه استعلام";
                break;
              case "info":
                if (item) {
                  btmSheet.item = { ...item };
                  btmSheet.title = "انتخاب فعالیت";
                }
                break;
              case "otp":
                btmSheet.title = "احراز هویت";
                btmSheet.text =
                  "کد یکبار مصرف ارسال‌شده به شماره موبایل مالک خودرو را وارد کنید.";
                initTimeout();
                break;
              case "delete":
                btmSheet.title = "حذف استعلام";
                btmSheet.text = `از حذف استعلام خودرو اطمینان دارید؟`;
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
            otp.value = "";
            showOtpError.value = false;
            resolve(true);
          }, 550);
        }
      });
    };
    const getInfo = (): void => {
      try {
        if (!carHistoryStore.getInfo.message) carHistoryStore.callGetInfo();
      } catch (err) {
        console.error("Error in getInfo: ", err);
      }
    };
    const getInquiryList = async (): Promise<void> => {
      const payload = { plaqueNo: carHistoryStore.getPlate.query };
      loaded.value = false;
      try {
        if (carHistoryStore.getInquiryList.length === 0)
          await carHistoryStore.callGetInquiryList(payload);
      } catch (err) {
        console.error("Error in getInquiryList: ", err);
      }
      loaded.value = true;
    };
    const delteInquiry = async (): Promise<void> => {
      await changeBtmSheetStatus(false);
      const payload = { id: btmSheet.item?.id || "" };
      try {
        await carHistoryStore.callDeleteInquiry(payload);
        store.setMessage({
          status: true,
          type: "success",
          title: "",
          text: "حذف استعلام خودرو با موفقیت انجام شد.",
          btnTxt: "",
        });
      } catch (err) {
        console.error("Error in deleteInquiry: ", err);
      }
    };
    const getInquiry = async (): Promise<void> => {
      const payload = { id: btmSheet.item?.id || "" };
      try {
        await carHistoryStore.callGetInquiry(payload);
        useChangeRoute("CarHistoryInquiryResult", false, { isPayment: false });
      } catch (err) {
        console.error("Error in getInquiry: ", err);
      }
    };
    const resendOtp = (): void => {
      otp.value = "";
      showOtpError.value = false;
      initTimeout();
      sendOtp();
    };
    const sendOtp = async (): Promise<void> => {
      const { isValid: sellerNationalCodeIsValid } = useNationalCodeRuleFunc(
        sellerNationalCode.value
      );
      if (sellerNationalCodeIsValid) {
        const barcodeOrBookletNumberIsValid =
          (selectedMethod.value === 0 && barcode.value) ||
          (selectedMethod.value === 1 && bookletNumber.value)
            ? true
            : false;
        if (!barcodeOrBookletNumberIsValid) {
          store.setMessage({
            status: true,
            type: "error",
            title: "",
            text: `لطفا ${
              selectedMethod.value === 0 ? "بارکد خودرو" : "شماره برگه سبز"
            } را وارد نمایید.`,
            btnTxt: "",
          });
          return;
        }
        const { isValid: buyerNationalCodeIsValid } = useNationalCodeRuleFunc(
          buyerNationalCode.value
        );
        if (!buyerNationalCodeIsValid && buyerNationalCode.value) {
          store.setMessage({
            status: true,
            type: "error",
            title: "",
            text: "لطفا کد ملی خریدار را اصلاح نمایید.",
            btnTxt: "",
          });
          return;
        }
      } else {
        store.setMessage({
          status: true,
          type: "error",
          title: "",
          text: "لطفا کد ملی مالک خودرو را اصلاح نمایید.",
          btnTxt: "",
        });
        return;
      }
      const payload = {
        barcode: selectedMethod.value === 0 ? barcode.value : null,
        bookletNumber: selectedMethod.value === 1 ? bookletNumber.value : null,
        nationalCode: sellerNationalCode.value,
        buyerNationalCode:
          buyerNationalCode.value || sellerNationalCode.value || null,
      };
      try {
        await carHistoryStore.callSendOtp(payload);
        if (!btmSheet.status) changeBtmSheetStatus(true, "otp");
      } catch (err) {
        console.error("Error in sendOtp: ", err);
      }
    };
    const getPayToken = async (): Promise<void> => {
      if (otp.value.length === 6) {
        const payload = {
          inquiryCode: carHistoryStore.getOtp.inquiryCode,
          verificationCode: otp.value,
          barcode: selectedMethod.value === 0 ? barcode.value : null,
          bookletNumber:
            selectedMethod.value === 1 ? bookletNumber.value : null,
          nationalCode: sellerNationalCode.value,
          buyerNationalCode:
            buyerNationalCode.value || sellerNationalCode.value || null,
        };
        try {
          await carHistoryStore.callGetPayToken(payload);
          await changeBtmSheetStatus(false);
          onPay();
        } catch (err) {
          console.error("Error in getPayToken: ", err);
        }
      } else showOtpError.value = true;
    };
    const onPay = async (): Promise<void> => {
      try {
        await store.callOnPay(carHistoryStore.getPayToken);
        setPay();
      } catch (err) {
        console.error("Error in onPay: ", err);
      }
    };
    const setPay = async (): Promise<void> => {
      const { token: payToken } = carHistoryStore.getPayToken;
      const payload = { payToken };
      try {
        await carHistoryStore.callSetPay(payload);
        useChangeRoute("CarHistoryInquiryResult", false, { isPayment: true });
      } catch (err) {
        console.error("Error in setPay: ", err);
      }
    };
    const loadData = () => {
      tab.value = (+store.getRouteQueryParams.tab as 0 | 1) || 0;
      barcode.value = carHistoryStore.getBarcode || null;
      bookletNumber.value = carHistoryStore.getBookletNumber || null;
      sellerNationalCode.value = carHistoryStore.getSellerNationalCode || "";
      buyerNationalCode.value = carHistoryStore.getBuyerNationalCode || "";
      getInfo();
    };

    onBeforeMount(() => {
      loadData();
    });
    onUnmounted(() => {
      clearTimeout(timer.value);
      clearInterval(timer2.value);
    });

    return {
      store,
      carHistoryStore,
      barcode,
      bookletNumber,
      sellerNationalCode,
      buyerNationalCode,
      btmSheet,
      tab,
      items,
      loaded,
      selectedMethod,
      radioItems,
      showOtpError,
      timeout,
      min,
      second,
      otp,
      changeBtmSheetStatus,
      sendOtp,
      resendOtp,
      openDeleteBtmSheet,
      getInquiry,
      getPayToken,
      delteInquiry,
      setTab,
      setRadioVal,
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
:deep(.barcode-bookletNumber-btn-con .v-button-con) {
  .v-button--link {
    span.component-text--body-large--med {
      font-size: 13px;
      font-weight: 500;
    }
    span.icon-info {
      font-size: $font_icon_size_small;
    }
  }
}
:deep(.input-container input) {
  height: 46px;
}
</style>
