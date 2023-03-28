import CryptoJS from 'crypto-js';

export const create16Uiid = () => {
  let result = '';
  for (let i = 0; i < 16; i += 1) {
    result += Number(Math.floor(Math.random() * 9));
  }
  return result;
};

export const encryptionBase64 = (t) => CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(t));

export const decryptionBase64 = (t) => CryptoJS.enc.Base64.parse(t).toString(CryptoJS.enc.Utf8);

export const encryptationData = (data, key) => {
  data = JSON.stringify(data);
  const encryptedMessage = {};
  const uid = create16Uiid();
  const iv = encryptionBase64(uid);
  const code = CryptoJS.AES.encrypt(
    data,
    CryptoJS.MD5(key),
    {
      iv: CryptoJS.enc.Utf8.parse(uid),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    },
  );
  encryptedMessage.iv = iv;
  encryptedMessage.data = code.ciphertext.toString(CryptoJS.enc.Base64);
  return encryptedMessage;
};

export const decryptionData = (data, key, iv) => {
  const iv64 = decryptionBase64(iv);
  const code = CryptoJS.AES.decrypt(
    data,
    CryptoJS.MD5(key),
    {
      iv: CryptoJS.enc.Utf8.parse(iv64),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    },
  );
  return JSON.parse(code.toString(CryptoJS.enc.Utf8));
};
