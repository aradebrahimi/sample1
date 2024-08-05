import { defineStore } from "pinia";
import { ref, computed, Ref } from "vue";
import api from "../../services/index";
import useStore from "../index";

const useCarHistoryStore = defineStore("carHistory", () => {
  //#region Vars

  //#region GetCarHistoryDescription
  const info: Ref<GetCarHistoryDescriptionRes> = ref({
    message: "",
  });
  //#endregion

  //#region GetInquiry
  const inquiry: Ref<CarHistoryGetInquiryRes> = ref({
    isTransferable: false,
    vehicleInfo: [],
    transactionInfo: [],
    debtInfo: [],
    inquiryDate: "",
    insuranceInfo: {
      start: "",
      end: "",
      report: [],
    },
  });
  //#endregion

  //#region GetInquiryList
  const inquiryList: Ref<CarHistoryGetInquiryListRes[]> = ref([]);
  //#endregion

  //#region SendOtp
  const otp: Ref<CarHistorySendOtpRes> = ref({
    inquiryCode: "",
  });
  //#endregion

  //#region CarHistoryInquiryPayToken
  const payToken: Ref<GetPayTokenRes> = ref({
    amount: 0,
    token: "",
  });
  //#endregion

  //#region CarHistoryInquirySetPay
  const payResult: Ref<CarHistoryGetInquiryRes> = ref({
    isTransferable: false,
    vehicleInfo: [],
    transactionInfo: [],
    debtInfo: [],
    inquiryDate: "",
    insuranceInfo: {
      start: "",
      end: "",
      report: [],
    },
  });
  //#endregion

  const plate: Ref<CarHistoryPlate> = ref({
    dis: "",
    letter: "",
    pelak: "",
    ir: "",
    query: "",
  });

  const barcode: Ref<string | null> = ref("");

  const bookletNumber: Ref<string | null> = ref("");

  const sellerNationalCode: StrRef = ref("");

  const buyerNationalCode: StrRef = ref("");

  //#endregion

  //#region Getters

  //#region GetCarHistoryDescription
  const getInfo = computed<GetCarHistoryDescriptionRes>(() => info.value);
  //#endregion

  //#region GetInquiry
  const getInquiry = computed<CarHistoryGetInquiryRes>(() => inquiry.value);
  //#endregion

  //#region GetInquiryList
  const getInquiryList = computed<CarHistoryGetInquiryListRes[]>(
    () => inquiryList.value
  );
  //#endregion

  //#region SendOtp
  const getOtp = computed<CarHistorySendOtpRes>(() => otp.value);
  //#endregion

  //#region CarHistoryInquiryPayToken
  const getPayToken = computed<GetPayTokenRes>(() => payToken.value);
  //#endregion

  //#region CarHistoryInquirySetPay
  const getPayResult = computed<CarHistoryGetInquiryRes>(() => payResult.value);
  //#endregion

  const getPlate = computed<CarHistoryPlate>(() => plate.value);

  const getBarcode = computed<string | null>(() => barcode.value);

  const getBookletNumber = computed<string | null>(() => bookletNumber.value);

  const getSellerNationalCode = computed<string>(
    () => sellerNationalCode.value
  );

  const getBuyerNationalCode = computed<string>(() => buyerNationalCode.value);

  //#endregion

  //#region Setters

  //#region GetCarHistoryDescription
  const setInfo = (payload: GetCarHistoryDescriptionRes) =>
    (info.value = payload);
  //#endregion

  //#region GetInquiry
  const setInquiry = (payload: CarHistoryGetInquiryRes) =>
    (inquiry.value = payload);
  //#endregion

  //#region GetInquiryList
  const setInquiryList = (payload: CarHistoryGetInquiryListRes[]) =>
    (inquiryList.value = payload);
  //#endregion

  //#region SendOtp
  const setOtp = (payload: CarHistorySendOtpRes) => (otp.value = payload);
  //#endregion

  //#region CarHistoryInquiryPayToken
  const setPayToken = (payload: GetPayTokenRes) => (payToken.value = payload);
  //#endregion

  //#region CarHistoryInquirySetPay
  const setPayResult = (payload: CarHistoryGetInquiryRes) =>
    (payResult.value = payload);
  //#endregion

  const setPlate = (payload: CarHistoryPlate) => (plate.value = payload);

  const setBarcode = (payload: string | null) => (barcode.value = payload);

  const setBookletNumber = (payload: string | null) =>
    (bookletNumber.value = payload);

  const setSellerNationalCode = (payload: string) =>
    (sellerNationalCode.value = payload);

  const setBuyerNationalCode = (payload: string) =>
    (buyerNationalCode.value = payload);

  //#endregion

  //#region APIs

  const callGetInfo = (): Promise<object> => {
    const store = useStore();
    return new Promise(async (resolve, reject) => {
      info.value = {
        message: "",
      };
      store.setLoading(true);
      try {
        const res: any = await api.getCarHistoryInfo();
        const response = res.data;
        info.value = { message: response || "" };
        resolve(info.value);
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
        isTransferable: false,
        vehicleInfo: [],
        transactionInfo: [],
        debtInfo: [],
        inquiryDate: "",
        insuranceInfo: {
          start: "",
          end: "",
          report: [],
        },
      };
      store.setLoading(true);
      try {
        const res: any = await api.getCarHistoryInquiry(payload);
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

  const callGetInquiryList = (
    payload: GetItemByPlaqueNoReq
  ): Promise<object> => {
    const store = useStore();
    return new Promise(async (resolve, reject) => {
      inquiryList.value = [];
      store.setLoading(true);
      try {
        const res: any = await api.getCarHistoryInquiryList(payload);
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
        const res: any = await api.deleteCarHistoryInquiry(payload);
        const response = res.data;
        resolve(response);
        await callGetInquiryList({ plaqueNo: plate.value.query });
      } catch (err: any) {
        reject(err);
        console.error("Error in callDeleteInquiry: ", err);
      }
      store.setLoading(false);
    });
  };

  const callSendOtp = (payload: CarHistorySendOtpReq): Promise<object> => {
    const store = useStore();
    return new Promise(async (resolve, reject) => {
      otp.value = {
        inquiryCode: "",
      };
      store.setLoading(true);
      try {
        const res: any = await api.sendCarHistoryOtp(payload);
        const response = res.data;
        otp.value = response;
        resolve(response);
      } catch (err: any) {
        reject(err);
        console.error("Error in callSendOtp: ", err);
      }
      store.setLoading(false);
    });
  };

  const callGetPayToken = (
    payload: CarHistoryInquiryPayTokenReq
  ): Promise<object> => {
    const store = useStore();
    return new Promise(async (resolve, reject) => {
      payToken.value = {
        amount: 0,
        token: "",
      };
      store.setLoading(true);
      try {
        const res: any = await api.getCarHistoryPayToken(payload);
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
        isTransferable: false,
        vehicleInfo: [],
        transactionInfo: [],
        debtInfo: [],
        inquiryDate: "",
        insuranceInfo: {
          start: "",
          end: "",
          report: [],
        },
      };
      store.setLoading(true);
      try {
        const res: any = await api.setCarHistoryPay(payload);
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
    getOtp,
    getPayToken,
    getPayResult,
    getPlate,
    getBarcode,
    getBookletNumber,
    getSellerNationalCode,
    getBuyerNationalCode,
    setInfo,
    setInquiry,
    setInquiryList,
    setOtp,
    setPayToken,
    setPayResult,
    setPlate,
    setBarcode,
    setBookletNumber,
    setSellerNationalCode,
    setBuyerNationalCode,
    callGetInfo,
    callGetInquiry,
    callGetInquiryList,
    callDeleteInquiry,
    callSendOtp,
    callGetPayToken,
    callSetPay,
  };
});

export default useCarHistoryStore;
