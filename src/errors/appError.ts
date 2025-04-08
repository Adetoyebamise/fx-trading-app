import { AppErrorCode, ErrorType } from './index';

export interface AppErrorParams {
  errorType: ErrorType;
  appErrorCode: AppErrorCode;
  error: any;
}

export class AppError {
  public readonly errorType: ErrorType;
  public readonly appErrorCode: AppErrorCode;
  public readonly error: any;

  constructor(params: AppErrorParams) {
    this.errorType = params.errorType;
    (this.appErrorCode = params.appErrorCode), (this.error = params.error);
  }
}
