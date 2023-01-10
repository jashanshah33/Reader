export * from "./constants";

export const getFormBody = (params) => {
  let formBody = [];

  for (const property in params) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(params[property]);

    formBody.push(encodedKey + "=" + encodedValue);
  }

  return formBody.join("&");
};
