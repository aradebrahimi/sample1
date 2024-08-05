import { defineStore } from "pinia";
import { ref, computed, Ref } from "vue";
import api from "../../services/index";
import useStore from "../index";

const useCarPlaqueHistoryStore = defineStore("carPlaqueHistory", () => {
  //#region Vars

  //#region GetCarPlaqueHistoryDescription
  const info: Ref<GetCarPlaqueHistoryDescriptionRes> = ref({
    info: "",
    plaqueTitle: "",
    plaqueName: "",
  });
  //#endregion

  //#region GetPlaqueInquiry
  const inquiry: Ref<CarPlaqueHistoryGetInquiryRes> = ref({
    id: "",
    plaqueHistoryInfo: [],
    plaqueName: "",
    plaqueTitle: "",
  });
  //#endregion

  //#region GetPlaqueInquiryList
  const inquiryList: Ref<CarPlaqueHistoryGetInquiryListRes[]> = ref([]);
  //#endregion

  //#region CarPlaqueHistoryInquiryPayToken
  const payToken: Ref<GetPayTokenRes> = ref({
    amount: 0,
    token: "",
  });
  //#endregion

  //#region CarPlaqueHistoryInquirySetPay
  const payResult: Ref<CarPlaqueHistoryGetInquiryRes> = ref({
    id: "",
    plaqueHistoryInfo: [],
    plaqueName: "",
    plaqueTitle: "",
  });
  //#endregion

  const plate: Ref<CarHistoryPlate> = ref({
    dis: "",
    letter: "",
    pelak: "",
    ir: "",
    query: "",
  });

  const nationalCode: StrRef = ref("");

  const mobileNo: StrRef = ref("");

  //#endregion

  //#region Getters

  //#region GetCarPlaqueHistoryDescription
  const getInfo = computed<GetCarPlaqueHistoryDescriptionRes>(() => info.value);
  //#endregion

  //#region GetPlaqueInquiry
  const getInquiry = computed<CarPlaqueHistoryGetInquiryRes>(
    () => inquiry.value
  );
  //#endregion

  //#region GetPlaqueInquiryList
  const getInquiryList = computed<CarPlaqueHistoryGetInquiryListRes[]>(
    () => inquiryList.value
  );
  //#endregion

  //#region CarPlaqueHistoryInquiryPayToken
  const getPayToken = computed<GetPayTokenRes>(() => payToken.value);
  //#endregion

  //#region CarPlaqueHistoryInquirySetPay
  const getPayResult = computed<CarPlaqueHistoryGetInquiryRes>(
    () => payResult.value
  );
  //#endregion

  const getPlate = computed<CarHistoryPlate>(() => plate.value);

  const getNationalCode = computed<string>(() => nationalCode.value);

  const getMobileNo = computed<string>(() => mobileNo.value);

  //#endregion

  //#region Setters

  //#region GetCarPlaqueHistoryDescription
  const setInfo = (payload: GetCarPlaqueHistoryDescriptionRes) =>
    (info.value = payload);
  //#endregion

  //#region GetPlaqueInquiry
  const setInquiry = (payload: CarPlaqueHistoryGetInquiryRes) =>
    (inquiry.value = payload);
  //#endregion

  //#region GetPlaqueInquiryList
  const setInquiryList = (payload: CarPlaqueHistoryGetInquiryListRes[]) =>
    (inquiryList.value = payload);
  //#endregion

  //#region CarPlaqueHistoryInquiryPayToken
  const setPayToken = (payload: GetPayTokenRes) => (payToken.value = payload);
  //#endregion

  //#region CarPlaqueHistoryInquirySetPay
  const setPayResult = (payload: CarPlaqueHistoryGetInquiryRes) =>
    (payResult.value = payload);
  //#endregion

  const setPlate = (payload: CarHistoryPlate) => (plate.value = payload);

  const setNationalCode = (payload: string) => (nationalCode.value = payload);

  const setMobileNo = (payload: string) => (mobileNo.value = payload);

  //#endregion

  //#region APIs

  const callGetInfo = (): Promise<object> => {
    const store = useStore();
    return new Promise(async (resolve, reject) => {
      info.value = {
        info: "",
        plaqueTitle: "",
        plaqueName: "",
      };
      const payload: GetItemByPlaqueNoReq = { plaqueNo: plate.value.query };
      store.setLoading(true);
      try {
        const res: any = await api.getCarPlaqueHistoryInfo(payload);
        const response = res.data;
        info.value = response;
        resolve(response);
      } catch (err: any) {
        reject(err);
        console.error("Error in callGetInfo: ", err);
      }
      store.setLoading(false);
    });
  };

  const callGetInquiry = (payload: GetItemByIdReq): Promise<object> => {
    const store = useStore();
    return new Promise(async (resolve, reject) => {
      inquiry.value = {
        id: "",
        plaqueHistoryInfo: [],
        plaqueName: "",
        plaqueTitle: "",
      };
      store.setLoading(true);
      try {
        const res: any = await api.getCarPlaqueHistoryInquiry(payload);
        const response = res.data;
        inquiry.value = response;
        resolve(response);
      } catch (err: any) {
        reject(err);
        console.error("Error in callGetInquiry: ", err);
      }
      store.setLoading(false);
    });
  };

  const callGetInquiryList = (): Promise<object> => {
    const store = useStore();
    return new Promise(async (resolve, reject) => {
      inquiryList.value = [];
      const payload: GetItemByPlaqueNoReq = { plaqueNo: plate.value.query };
      store.setLoading(true);
      try {
        const res: any = await api.getCarPlaqueHistoryInquiryList(payload);
        const response = res.data;
        inquiryList.value = response;
        resolve(response);
      } catch (err: any) {
        reject(err);
        console.error("Error in callGetInquiryList: ", err);
      }
      store.setLoading(false);
    });
  };

  const callDeleteInquiry = (payload: GetItemByIdReq): Promise<object> => {
    const store = useStore();
    return new Promise(async (resolve, reject) => {
      store.setLoading(true);
      try {
        const res: any = await api.deleteCarPlaqueHistoryInquiry(payload);
        const response = res.data;
        resolve(response);
        await callGetInquiryList();
      } catch (err: any) {
        reject(err);
        console.error("Error in callDeleteInquiry: ", err);
      }
      store.setLoading(false);
    });
  };

  const callGetPayToken = (
    payload: CarPlaqueHistoryInquiryPayTokenReq
  ): Promise<object> => {
    const store = useStore();
    return new Promise(async (resolve, reject) => {
      payToken.value = {
        amount: 0,
        token: "",
      };
      store.setLoading(true);
      try {
        const res: any = await api.getCarPlaqueHistoryPayToken(payload);
        const response = res.data;
        payToken.value = response;
        resolve(response);
      } catch (err: any) {
        reject(err);
        console.error("Error in callGetPayToken: ", err);
      }
      store.setLoading(false);
    });
  };

  const callSetPay = (payload: SetPayReq): Promise<object> => {
    const store = useStore();
    return new Promise(async (resolve, reject) => {
      payResult.value = {
        id: "",
        plaqueHistoryInfo: [],
        plaqueName: "",
        plaqueTitle: "",
      };
      store.setLoading(true);
      try {
        const res: any = await api.setCarPlaqueHistoryPay(payload);
        const response = res.data;
        payResult.value = response;
        inquiryList.value = [];
        resolve(response);
      } catch (err: any) {
        reject(err);
        console.error("Error in callSetPay: ", err);
      }
      store.setLoading(false);
    });
  };

  //#endregion

  return {
    getInfo,
    getInquiry,
    getInquiryList,
    getPayToken,
    getPayResult,
    getPlate,
    getNationalCode,
    getMobileNo,
    setInfo,
    setInquiry,
    setInquiryList,
    setPayToken,
    setPayResult,
    setPlate,
    setNationalCode,
    setMobileNo,
    callGetInfo,
    callGetInquiry,
    callGetInquiryList,
    callDeleteInquiry,
    callGetPayToken,
    callSetPay,
  };
});

export default useCarPlaqueHistoryStore;
