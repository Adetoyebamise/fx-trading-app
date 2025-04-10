import { NextFunction, Request, Response } from 'express';
import jwtlib from 'jsonwebtoken';
import { UserAuthObject } from '../utils/helper';

declare global {
  namespace Express {
    export interface Request {
      auth: UserAuthObject;
    }
  }
}

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    if (!req.headers.authorization) {
      return res
        .status(403)
        .send({ status: 'failed', message: 'Missing Credentials' });
    }

    const jwt =
      req.headers.authorization.split(' ')[1] ||
      req.headers.authorization ||
      '';
    const secret = process.env.JWTKEY || '';

    const payload = <UserAuthObject>jwtlib.verify(jwt, secret, {
      maxAge: '1d',
      algorithms: ['HS256'],
    });
    if (!payload) {
      return res
        .status(401)
        .send({ status: 'failed', message: 'invalid token' });
    }

    req.auth = payload;

    if (!req.auth.id) {
      return res
        .status(401)
        .send({ status: 'failed', message: 'token invalid' });
    }

    next();
  } catch (error) {
    next(error);
  }
};
