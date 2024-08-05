import axios from "axios";
import { toCamelCaseObjectKeys } from "./coreLib";
import useStore from "../stores/index";

const createInstance = () => {
  return axios.create({
    timeout: 60000,
    headers: { "Cache-Control": "no-cache" },
    transformResponse: [
      (data) => {
        let resp;
        try {
          resp = toCamelCaseObjectKeys(JSON.parse(data));
        } catch (error) {
          throw Error(
            `[requestClient] Error parsing response JSON data - ${JSON.stringify(
              error
            )}`
          );
        }
        if (resp.status === 0) {
          return resp;
        } else {
          const store = useStore();
          store.setMessage({
            status: true,
            type: "error",
            title: "",
            text: resp.message || store.getDefaultErrMessage,
            btnTxt: "",
          });
          try {
            throw Error(resp.message);
          } catch (error) {
            console.log(error);
          }
        }
      },
    ],
  });
};
const http = createInstance();
http.interceptors.request.use(
  (config) => {
    const store = useStore();
    const sample1Params: Sample1Params = sessionStorage?.getItem(
      "sample1Params"
    )
      ? JSON.parse(sessionStorage.getItem("sample1Params") as string)
      : store.getSample1Params;
    const { webToken } = sample1Params;
    const headersConfig = config?.headers;
    if (webToken) headersConfig.WebToken = webToken;
    return config;
  },
  (error) => Promise.reject(error)
);
http.interceptors.response.use(
  (response) => {
    if (response.status === 401) {
      const store = useStore();
      const code = " (کد 401)";
      const message = `خطایی پیش آمده! لطفا دوباره تلاش کنید.${code}`;
      store.setMessage({
        status: true,
        type: "error",
        title: "",
        text: message,
        btnTxt: "",
      });
    }
    return response.data;
  },
  (err) => {
    const store = useStore();
    const code = err?.response?.status ? ` (کد ${err?.response?.status})` : "";
    const message = `خطایی پیش آمده! لطفا دوباره تلاش کنید.${code}`;
    store.setMessage({
      status: true,
      type: "error",
      title: "",
      text: err.message || message,
      btnTxt: "",
    });
    return Promise.reject(err);
  }
);
export default http;
