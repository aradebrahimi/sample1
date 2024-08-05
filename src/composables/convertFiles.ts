
export const useGetBase64File = (file) => {
  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file); // Read the file as base64
    return new Promise((resolve, reject) => {
      reader.onerror = (): void => {
        reader.abort();
        reject(new Error("Error parsing file"));
      };
      reader.onload = (): void => {
        const base64StringFile = (reader.result as string)?.split("base64,")[1];
        resolve(base64StringFile);
      };
    });
  } else return "";
};

export const useDownloadByteArrayFile = (
  payload,
  fileType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
): void => {
  if (payload) {
    const blob = new Blob([payload], {
      type: fileType,
    });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `report_${new Date().getTime()}.xlsx`;
    link.click();
  }
};
