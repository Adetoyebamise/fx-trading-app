import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import * as Crypto from 'crypto';

import { randomBytes, scrypt } from 'crypto';
const scryptAsync = promisify(scrypt);

export const OTPGenerator = (max: number, alphanumeric = false): string => {
  const digits = !alphanumeric
    ? '0123456789'
    : 'abcdefghijklmnopqrstuvwxyz01234567890';
  let OTP = '';
  for (let i = 0; i < max; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};

export const AlphaNumeric = (length: number, type = 'alpha') => {
  let result = '';
  const characters =
    type === 'alpha'
      ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      : '0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const getSignHeader = (parameters: any) => {
  return Crypto.createHash('sha512').update(parameters).digest('hex');
};

export const generateRequestId = AlphaNumeric(12);

export const addMinutesToDate = (date: Date, minutes: number) => {
  return new Date(date.getTime() + minutes * 60000);
};

export const compareDate = (firstDate: Date, secondDate: Date) => {
  return firstDate.getTime() - secondDate.getTime();
};

export class Password {
  static async toHash(password: string) {
    const salt = randomBytes(8).toString('hex');
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;

    return `${buf.toString('hex')}.${salt}`;
  }

  static async compare(password: string, plaintext: string) {
    const [hashedPassword, salt] = password.split('.');
    const buf = (await scryptAsync(plaintext, salt, 64)) as Buffer;

    return buf.toString('hex') == hashedPassword;
  }
}

export const generateJWT = (
  secret: string,
  payload: UserAuthObject,
): string => {
  return jwt.sign(payload, secret, {
    algorithm: 'HS256',
    expiresIn: '1d',
  });
};

export const formatPhone = (phone: string) => {
  if (!phone || phone.length < 11) return null;
  if (phone.indexOf('+234') > -1 && phone.length === 14) return phone;

  if (!phone.startsWith('0')) return null;

  const formattedPhone = phone.replace('0', '+234');
  return formattedPhone;
};

export type UserAuthObject = {
  id: string;
  status: string;
  bvnStatus: boolean;
};
