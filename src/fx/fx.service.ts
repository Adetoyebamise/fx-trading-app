import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { AppError } from '../errors/appError';
import { EINVALID, descriptions } from '../errors/index';

@Injectable()
export class FxService {
  async getFxRate(base: string, target: string) {
    if (!base || !target) {
      throw new AppError({
        errorType: EINVALID,
        appErrorCode: '',
        error: descriptions.ErrorRequestDenied,
      });
    }

    try {
      const response = await axios.get('https://www.exchangerate-api.com', {
        params: {
          base,
          symbols: target,
        },
      });

      const rate = response.data.rates?.[target.toUpperCase()];

      if (!rate) {
        throw new AppError({
          errorType: EINVALID,
          appErrorCode: '',
          error: descriptions.ErrorRequestDenied,
        });
      }

      return {
        base: base.toUpperCase(),
        target: target.toUpperCase(),
        rate,
      };
    } catch (error) {
      console.error('FX rate error:', error);
      throw new AppError({
        errorType: EINVALID,
        appErrorCode: '',
        error: descriptions.ErrorRequestDenied,
      });
    }
  }
}
