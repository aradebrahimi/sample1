export const useClose = (payload: Message, timeoutPayload: Timeout): void => {
  payload.status = false;
  clearTimeout(timeoutPayload);
  timeoutPayload = setTimeout(() => {
    payload.type = "";
    payload.title = "";
    payload.text = "";
    payload.btnTxt = "";
  }, 200);
};
export const useOpen = (
  payload: Message,
  type: string,
  title: string,
  text: string,
  btnTxt: string = ""
): void => {
  payload.type = type;
  payload.title = title;
  payload.text = text;
  payload.btnTxt = btnTxt;
  payload.status = true;
};
