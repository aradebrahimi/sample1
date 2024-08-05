import { defineStore } from "pinia";
import { ref, computed, Ref } from "vue";

const useStore = defineStore("app", () => {
  //#region Vars
  const sample1Params: Ref<Sample1Params> = ref({
    webToken: "",
    os: "webapp",
    cv: 0,
  });
  const message: Messages = ref({
    status: false,
    type: "",
    title: "",
    text: "",
    btnTxt: "",
  });
  const loading: BoolRef = ref(false);
  const routeQueryParams: Ref<any> = ref({});
  const defaultErrMessage: Ref<string> = ref(
    "خطایی پیش آمده! لطفا دوباره تلاش کنید."
  );
  //#endregion

  //#region Getters
  const getSample1Params = computed<Sample1Params>(() => sample1Params.value);
  const getMessage = computed<Message>(() => message.value);
  const getLoading = computed<boolean>(() => loading.value);
  const getRouteQueryParams = computed<any>(() => routeQueryParams.value);
  const getDefaultErrMessage = computed<string>(() => defaultErrMessage.value);
  //#endregion

  //#region Setters
  const setSample1Params = (payload: Sample1Params) =>
    (sample1Params.value = payload);
  const resetMessage = () => {
    message.value = {
      status: false,
      type: "",
      title: "",
      text: "",
      btnTxt: "",
    };
  };
  const setMessage = (payload: Message) => {
    resetMessage();
    setTimeout(() => {
      message.value = payload;
    }, 300);
  };
  const setLoading = (payload: boolean) => (loading.value = payload);
  const setRouteQueryParams = (payload: any) =>
    (routeQueryParams.value = payload);
  const setDefaultErrMessage = (payload: string) =>
    (defaultErrMessage.value = payload);
  //#endregion
  const getErrorMessage = (payload: string): string => {
    let errMessage: string = payload;
    if (!payload) {
      errMessage = getDefaultErrMessage.value;
    }
    return errMessage;
  };
  const callOnPay = (payload: GetPayTokenRes): Promise<object> => {
    const store = useStore();
    return new Promise(async (resolve, reject) => {
      const { amount, token } = payload;
      store.setLoading(true);
      try {
        const res: any = await (window as any).Something.pay(amount, token);
        if (res.Status === 0) {
          const response = res.Data;
          resolve(response);
        } else {
          reject(res);
          store.setLoading(false);
          store.setMessage({
            status: true,
            type: "error",
            title: "",
            text: getErrorMessage(res?.Message),
            btnTxt: "",
          });
        }
      } catch (err: any) {
        reject(err);
        store.setLoading(false);
        store.setMessage({
          status: true,
          type: "error",
          title: "",
          text: getErrorMessage("خطا در دریافت اطلاعات"),
          btnTxt: "",
        });
        console.error("Error in callOnPay: ", err);
      }
      store.setLoading(false);
    });
  };
  return {
    getSample1Params,
    getMessage,
    getLoading,
    getRouteQueryParams,
    getDefaultErrMessage,
    getErrorMessage,
    setSample1Params,
    resetMessage,
    setMessage,
    setLoading,
    setRouteQueryParams,
    setDefaultErrMessage,
    callOnPay,
  };
});

export default useStore;
