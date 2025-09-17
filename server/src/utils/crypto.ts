// server/src/utils/crypto.ts
import CryptoJS from 'crypto-js';

const BACK_KEY = process.env.BACK_KEY || 'backend_default_key_change_me';

export function backendEncrypt(plain: string): string {
  return CryptoJS.AES.encrypt(plain, BACK_KEY).toString();
}

export function backendDecrypt(cipher: string): string {
  try {
    const bytes = CryptoJS.AES.decrypt(cipher, BACK_KEY);
    const result = bytes.toString(CryptoJS.enc.Utf8);
    return result;
  } catch {
    return '';
  }
}
