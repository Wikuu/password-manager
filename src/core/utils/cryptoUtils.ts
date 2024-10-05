import CryptoJS from "crypto-js";

const encryptData = (data: unknown, secretKey: string) => {
  let dataString = data;

  if (typeof data !== "string") {
    dataString = JSON.stringify(data);
  }

  const encrypted = CryptoJS.AES.encrypt(
    dataString as string,
    secretKey
  ).toString();
  return encrypted;
};

const decryptData = (encryptedData: string, secretKey: string) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);
  return decrypted;
};

export { encryptData, decryptData };
