import jwt from 'jsonwebtoken';
import * as Crypto from 'crypto';

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

export const generateJWT = (
  secret: string,
  payload: UserAuthObject,
): string => {
  return jwt.sign(payload, secret, {
    algorithm: 'HS256',
    expiresIn: '1d',
  });
};

export type UserAuthObject = {
  id: string;
  email: string;
};
