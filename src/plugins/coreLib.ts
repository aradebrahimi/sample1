export const toCamelCaseObjectKeys = (o) => {
  var newO, origKey, newKey, value;
  if (o instanceof Array) {
    return o.map(function (value) {
      if (typeof value === "object") {
        value = toCamelCaseObjectKeys(value);
      }
      return value;
    });
  } else {
    newO = {};
    for (origKey in o) {
      if (o.hasOwnProperty(origKey)) {
        newKey = (
          origKey.charAt(0).toLowerCase() + origKey.slice(1) || origKey
        ).toString();
        value = o[origKey];
        if (
          value instanceof Array ||
          (value !== null && value.constructor === Object)
        ) {
          value = toCamelCaseObjectKeys(value);
        }
        newO[newKey] = value;
      }
    }
  }
  return newO;
};
export const toEngNum = (
  payload: string,
  returnNum: 0 | 1 = 1
): number | string => {
  let engNum: number | string;
  engNum = payload
    .replace(/[٠١٢٣٤٥٦٧٨٩]/g, (d) => (d.charCodeAt(0) - 1632).toString()) // Convert Arabic numbers
    .replace(/[۰۱۲۳۴۵۶۷۸۹]/g, (d) => (d.charCodeAt(0) - 1776).toString()); // Convert Persian numbers

  return returnNum ? parseFloat(engNum) * 1 : engNum.toString();
};
export const toLowerCaseObjectKeys = (obj) => {
  var payload = JSON.parse(JSON.stringify(obj));
  var key,
    keys = Object.keys(payload);
  var n = keys.length;
  var newobj = {};
  while (n--) {
    key = keys[n];
    newobj[key.toLowerCase()] = payload[key];
  }
  return newobj;
};
