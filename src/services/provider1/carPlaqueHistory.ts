import http from "../../plugins/https";

const baseUrl = "https://test.sample.ir/api/CarPlaqueHistory/";

const carPlaqueHistoryServices = {
  getCarPlaqueHistoryInfo: (data: GetItemByPlaqueNoReq) => {
    return http({
      url: `${baseUrl}GetDescription?plaqueNo=${data.plaqueNo}`,
      method: "get",
    });
  },
  getCarPlaqueHistoryInquiry: (data: GetItemByIdReq) => {
    return http({
      url: `${baseUrl}PlaqueInquiry?id=${data.id}`,
      method: "get",
    });
  },
  getCarPlaqueHistoryInquiryList: (data: GetItemByPlaqueNoReq) => {
    return http({
      url: `${baseUrl}PlaqueInquiryList?plaqueNo=${data.plaqueNo}`,
      method: "get",
    });
  },
  deleteCarPlaqueHistoryInquiry: (data: GetItemByIdReq) => {
    return http({
      url: `${baseUrl}DeletePlaque`,
      method: "post",
      data,
    });
  },
  getCarPlaqueHistoryPayToken: (data: CarPlaqueHistoryInquiryPayTokenReq) => {
    return http({
      url: `${baseUrl}PlaquePayToken`,
      method: "post",
      data,
    });
  },
  setCarPlaqueHistoryPay: (data: SetPayReq) => {
    return http({
      url: `${baseUrl}PlaqueSetPay`,
      method: "post",
      data,
    });
  },
};

export default carPlaqueHistoryServices;
