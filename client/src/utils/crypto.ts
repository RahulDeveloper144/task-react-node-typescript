// client/src/utils/crypto.ts
import CryptoJS from 'crypto-js';

const FRONT_KEY = import.meta.env.VITE_FRONT_KEY || 'front_default_key_change_me';

export function frontendEncrypt(obj: any): string {
  const plain = JSON.stringify(obj);
  return CryptoJS.AES.encrypt(plain, FRONT_KEY).toString();
}

export function frontendDecrypt(cipher: string): string {
  try {
    const bytes = CryptoJS.AES.decrypt(cipher, FRONT_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch {
    return '';
  }
}

export function sha256(str: string): string {
  return CryptoJS.SHA256(str).toString();
}
