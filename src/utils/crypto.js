import CryptoJS from 'crypto-js';

function randomString(n) {
  const t = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const len = t.length;
  let str = '';
  for (let i = 0; i < n; i++) {
    str += t.charAt(Math.floor(Math.random() * len));
  }
  return str;
}

function cryptoParse(value) {
  return CryptoJS.enc.Utf8.parse(value);
}

const __Key__ = 'x!A%D*G-KaPdRgUk';
const config = {
  key: cryptoParse(__Key__),
  iv: cryptoParse('102o4a6489ABL9EF'),
  mode: CryptoJS.mode.CBC,
  padding: CryptoJS.pad.Pkcs7,
};

function encrypt(params) {
  const { key, ...rest } = config;
  const str = typeof params === 'string' ? params : JSON.stringify(params);
  const ciphertext = CryptoJS.AES.encrypt(str, key, rest).toString();
  const txt = ciphertext + randomString(4);
  
  return txt;
}

function decrypt(str) {
  const { key, ...rest } = config;

  const bytes = CryptoJS.AES.decrypt(str, key, rest);
  const resultText = bytes.toString(CryptoJS.enc.Utf8);
  return resultText;
}

export { __Key__, encrypt, decrypt };
