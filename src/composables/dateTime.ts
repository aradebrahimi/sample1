import { computed, ref } from "vue";
import moment from "jalali-moment";

export const useGetCurrentDate = (option: "jalali" | "georgian"): string => {
  let today: string | Date = new Date();
  today = today.toISOString().split("T")[0];
  const m = moment(today, "YYYY-M-D");
  if (option === "jalali") return m.format("jYYYY/jMM/jDD");
  else return m.format("YYYY/MM/DD");
};

export const useGetCurrentJalaliDate = computed<string>(() =>
  useGetCurrentDate("jalali")
);

export const useMiladiToShamsi = (payload, option: number = 1): string => {
  let shamsiDate: string = "-";
  if (
    payload &&
    payload[0] &&
    !payload[0].includes("0001-01-01") &&
    payload !== "0001-01-01T00:00:00" &&
    payload !== "None" &&
    payload !== "none" &&
    payload !== "NONE"
  ) {
    if (typeof payload != "string" && payload.length > 0)
      payload = payload[0].split("T")[0];
    let m = moment(payload, "YYYY-M-D HH:mm:ss").locale("fa");
    if (option === 1) shamsiDate = m.format("YYYY/M/D");
    else if (option === 2) shamsiDate = m.format("HH:mm YYYY/M/D");
    else if (option === 3) shamsiDate = m.format("YYYY/MM/DD");
  }
  return shamsiDate;
};

export const useShamsiToMiladi = (payload: string): string => {
  let miladiDate: string = "-";
  if (payload)
    miladiDate = moment.from(payload, "fa", "YYYY/MM/DD").format("YYYY/MM/DD");
  return miladiDate;
};

export const useGetTime = (): { hours: NumRef; minutes: NumRef } => {
  const date = new Date();
  const hours = ref(date.getHours());
  const minutes = ref(date.getMinutes());
  return { hours, minutes };
};
