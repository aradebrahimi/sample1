export { BoolRef };

declare global {
  //#region APIs

  //#region Provider1
  //#region CarHistory
  interface CarHistoryPlate {
    dis: string;
    letter: string;
    pelak: string;
    ir: string;
    query: string;
  }

  //#region GetCarHistoryDescription
  interface GetCarHistoryDescriptionRes {
    message: string;
  }
  //#endregion

  //#region GetInquiry
  interface CarHistoryGetInquiryRes {
    isTransferable: boolean;
    vehicleInfo: KeyValueRes[];
    transactionInfo: KeyValueRes[];
    debtInfo: KeyValueRes[];
    inquiryDate: string;
    insuranceInfo: {
      start: string;
      end: string;
      report: {
        date: string;
        message: string;
        price: string;
        state: string;
      }[];
    };
  }
  //#endregion

  //#region GetInquiryList
  interface CarHistoryGetInquiryListRes {
    id: number | string;
    title: string;
    inquiryDate: string;
    isTransferable: boolean;
  }
  //#endregion

  //#region SendOtp
  interface CarHistorySendOtpReq {
    barcode: string | null;
    bookletNumber: string | null;
    nationalCode: string;
    buyerNationalCode: string;
  }
  interface CarHistorySendOtpRes {
    inquiryCode: string;
  }
  //#endregion

  //#region CarHistoryInquiryPayToken
  interface CarHistoryInquiryPayTokenReq {
    inquiryCode: string;
    verificationCode: string;
    barcode: string | null;
    bookletNumber: string | null;
    nationalCode: string;
    buyerNationalCode: string;
  }
  //#endregion
  //#endregion
  //#region CarPlaqueHistory
  //#region GetCarPlaqueHistoryDescription
  interface GetCarPlaqueHistoryDescriptionRes {
    info: string;
    plaqueName: string | null;
    plaqueTitle: string;
  }
  //#endregion

  //#region GetPlaqueInquiry
  interface CarPlaqueHistoryGetInquiryRes {
    id?: number | string;
    plaqueHistoryInfo: KeyValueRes[][];
    plaqueName: string | null;
    plaqueTitle: string;
  }
  //#endregion

  //#region GetPlaqueInquiryList
  interface CarPlaqueHistoryGetInquiryListRes {
    id: number | string;
    plaqueHistoryInfo: KeyValueRes[];
    plaqueName: string | null;
    plaqueTitle: string;
  }
  //#endregion

  //#region CarPlaqueHistoryInquiryPayToken
  interface CarPlaqueHistoryInquiryPayTokenReq {
    mobileNo: number;
    nationalCode: string;
    plaqueNo: string;
  }
  //#endregion
  //#endregion
  //#endregion
  //#endregion

  interface KeyValueRes {
    key: string;
    value: number | string;
  }

  interface GetPayTokenRes {
    amount: number;
    token: string;
  }

  interface SetPayReq {
    payToken: string;
  }

  interface GetItemByIdReq {
    id: number | string;
  }

  interface GetItemByPlaqueNoReq {
    plaqueNo: string;
  }

  type BoolRef = Ref<boolean>;

  interface Message {
    status: boolean;
    type: string;
    title: string;
    text: string;
    btnTxt: string;
  }

  type Messages = Ref<Message>;

  type OsTypes = "webapp" | "webappf" | "android" | "androidf" | "ios" | "iosf";

  interface Sample1Params {
    webToken: string;
    os: OsTypes;
    cv: number;
  }

  interface HintBox {
    text: string;
    label: string;
    type: "error" | "primary";
  }

  type Timeout = ReturnType<typeof setTimeout>;

  type Timeval = ReturnType<typeof setInterval>;

  type ImgRef = Ref<HTMLImageElement | null>;

  type NumRef = Ref<number>;

  type DivRef = Ref<HTMLDivElement | null>;

  type StrRef = Ref<string>;
}

declare type BoolRef = Ref<boolean>;
