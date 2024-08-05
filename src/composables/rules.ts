import { reactive } from "vue";

export const useRequiredRule = reactive([
  (v) => {
    if (v) {
      if (typeof v === "object") {
        if (v.length === undefined || v.length > 0) return true;
        else return "الزامی است";
      }
      return true;
    }
    return "الزامی است";
  },
]);

export const useRequiredRuleFunc = (
  v: any
): { message: string; isValid: boolean } => {
  const obj = {
    message: "",
    isValid: false,
  };
  if (v) {
    if (typeof v === "object") {
      if (v.length === undefined || v.length > 0) {
        obj.isValid = true;
        return obj;
      } else {
        obj.message = "الزامی است";
        obj.isValid = false;
        return obj;
      }
    }
    obj.isValid = true;
    return obj;
  }
  obj.message = "الزامی است";
  obj.isValid = false;
  return obj;
};

export const useNotRequiredRule = reactive([(v) => true]);

export const useMobileNoRule = reactive([
  (v) => {
    const errorTxt = "شماره همراه وارد شده صحیح نمی‌باشد";
    if (v) {
      const vLength = v.length;
      const vNum = parseInt(v);
      if ((v[0] === "0" && vLength < 11) || vLength < 10 || vLength > 11)
        return errorTxt;
      if (
        (vLength === 10 && vNum == v) ||
        (vLength === 11 && vNum == v.slice(1))
      )
        return true;
    }
    return errorTxt;
  },
]);

export const useMobileNoRuleFunc = (
  v: string
): { message: string; isValid: boolean } => {
  const obj = {
    message: "شماره همراه وارد شده صحیح نمی‌باشد",
    isValid: false,
  };
  if (v) {
    const vLength = v.length;
    const vNum = parseInt(v);
    if ((v[0] === "0" && vLength < 11) || vLength < 10 || vLength > 11)
      return obj;
    if (
      (vLength === 10 && (vNum as any) == v) ||
      (vLength === 11 && (vNum as any) == v.slice(1))
    ) {
      obj.message = "";
      obj.isValid = true;
      return obj;
    }
  }
  return obj;
};

export const useNationalCodeRule = reactive([
  (v: string) => {
    let errorTxt: string | boolean = "الزامی است";
    if (v) {
      errorTxt =
        /^(?=.{10}$)[0-9 ٠-٩ ۰-۹]*$/.test(v) || "وارد کردن ده رقم الزامی است";
      if (errorTxt === true) {
        let newErrorTxt = "کدملی صحیح نمی باشد";
        const length = v.length;
        if (length < 8 || parseInt(v, 10) === 0) return newErrorTxt;
        const v2 = ("0000" + v).substr(length - 6);
        if (parseInt(v2.substr(3, 6), 10) === 0) return newErrorTxt;
        const c = parseInt(v2.substr(9, 1), 10);
        let s = 0;
        for (let i = 0; i < 9; i++)
          s += parseInt(v2.substr(i, 1), 10) * (10 - i);
        s = s % 11;
        if ((s < 2 && c === s) || (s >= 2 && c === 11 - s)) {
          if (
            v === "1111111111" ||
            v === "2222222222" ||
            v === "3333333333" ||
            v === "4444444444" ||
            v === "5555555555" ||
            v === "6666666666" ||
            v === "7777777777" ||
            v === "8888888888" ||
            v === "9999999999"
          )
            return newErrorTxt;
          else return true;
        } else return newErrorTxt;
      } else return errorTxt;
    }
    return errorTxt;
  },
]);

export const useNationalCodeRuleFunc = (
  v: string
): { message: string; isValid: boolean } => {
  const obj = {
    message: "الزامی است",
    isValid: false,
  };
  if (v) {
    obj.isValid = /^(?=.{10}$)[0-9 ٠-٩ ۰-۹]*$/.test(v);
    obj.message = obj.isValid ? "" : "وارد کردن ده رقم الزامی است";
    if (obj.isValid) {
      const errorTxt = "کدملی صحیح نمی باشد";
      const length = v.length;
      if (length < 8 || parseInt(v, 10) === 0) {
        obj.message = errorTxt;
        obj.isValid = false;
        return obj;
      }
      const v2 = ("0000" + v).substr(length - 6);
      if (parseInt(v2.substr(3, 6), 10) === 0) {
        obj.message = errorTxt;
        obj.isValid = false;
        return obj;
      }
      const c = parseInt(v2.substr(9, 1), 10);
      let s = 0;
      for (let i = 0; i < 9; i++) s += parseInt(v2.substr(i, 1), 10) * (10 - i);
      s = s % 11;
      if ((s < 2 && c === s) || (s >= 2 && c === 11 - s)) {
        if (
          v === "1111111111" ||
          v === "2222222222" ||
          v === "3333333333" ||
          v === "4444444444" ||
          v === "5555555555" ||
          v === "6666666666" ||
          v === "7777777777" ||
          v === "8888888888" ||
          v === "9999999999"
        ) {
          obj.message = errorTxt;
          obj.isValid = false;
          return obj;
        } else {
          obj.message = "";
          obj.isValid = true;
          return obj;
        }
      } else {
        obj.message = errorTxt;
        obj.isValid = false;
        return obj;
      }
    } else return obj;
  }
  return obj;
};
