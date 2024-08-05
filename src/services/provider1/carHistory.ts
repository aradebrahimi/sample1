import http from "../../plugins/https";

const baseUrl = "https://test.sample.ir/api/CarHistory/";

const carHistoryServices = {
  getCarHistoryInfo: () => {
    return http({
      url: `${baseUrl}GetDescription`,
      method: "get",
    });
  },
  getCarHistoryInquiry: (data: GetItemByIdReq) => {
    return http({
      url: `${baseUrl}Inquiry?id=${data.id}`,
      method: "get",
    });
  },
  getCarHistoryInquiryList: (data: GetItemByPlaqueNoReq) => {
    return http({
      url: `${baseUrl}InquiryList?plaqueNo=${data.plaqueNo}`,
      method: "get",
    });
  },
  deleteCarHistoryInquiry: (data: GetItemByIdReq) => {
    return http({
      url: `${baseUrl}Delete`,
      method: "post",
      data,
    });
  },
  sendCarHistoryOtp: (data: CarHistorySendOtpReq) => {
    return http({
      url: `${baseUrl}GetOtp`,
      method: "post",
      data,
    });
  },
  getCarHistoryPayToken: (data: CarHistoryInquiryPayTokenReq) => {
    return http({
      url: `${baseUrl}PayToken`,
      method: "post",
      data,
    });
  },
  setCarHistoryPay: (data: SetPayReq) => {
    return http({
      url: `${baseUrl}SetPay`,
      method: "post",
      data,
    });
  },
};

export default carHistoryServices;
