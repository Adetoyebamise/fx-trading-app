export type ErrorType = string;
export type ErrorStatus = number;
export type AppErrorCode = string;

export const ECONFLICT: ErrorType = 'conflict';
export const EFAILURE: ErrorType = 'failure';
export const EINTERNAL: ErrorType = 'internal';
export const EINVALID: ErrorType = 'invalid';
export const ENOTFOUND: ErrorType = 'not found';

export const BAD_REQUEST_STATUS_CODE: ErrorStatus = 400;
export const BAD_REQUEST_STATUS_MESSAGE: AppErrorCode = 'Bad request';
export const INTERNAL_SERVER_MESSAGE: AppErrorCode = 'Internal server error';
export const INTERNAL_SERVER_STATUS_CODE: ErrorStatus = 500;
export const METHOD_NOT_ALLOWED_STATUS_CODE: ErrorStatus = 405;
export const NOT_FOUND_STATUS_CODE: ErrorStatus = 404;
export const NOT_FOUND_STATUS_MESSAGE: AppErrorCode = 'Not found';
export const SUCCESS_RESPONSE_STATUS_CODE: ErrorStatus = 200;
export const SUCCESS_RESPONSE_NO_CONTENT_STATUS_CODE: ErrorStatus = 204;
export const SUCCESS_RESPONSE_STATUS_MESSAGE: AppErrorCode =
  'Successfully updated';
export const NO_PERMISSION: ErrorStatus = 403;

//User Repository
export const ErrorCreatingUser: AppErrorCode = 'UR10000';
export const ErrorUserExists: AppErrorCode = 'UR100';
export const ErrorUserNotFound: AppErrorCode = 'UR200';

export const descriptions = {
  ErrorNoPermission: 'You do not have the permission to perform this',
  ErrorUserExists: 'User with email or phone number exists',
  ErrorCreatingUser: 'Error Creating User Account',
  ErrorUserNotFound: 'User Not Found',
  ErrorUpdatingUserPassword: 'Error Updating User Password',
  ErrorUsernameOrPassword: 'Username or Password Incorrect',
  ErrorRequestDenied: 'Cant request resource',
};
