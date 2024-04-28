interface CustomError extends Error {
  statusCode?: number;
}
export function errorHandler(statusCode: number, message: string): CustomError {
  const error: CustomError = new Error();
  error.statusCode = statusCode;
  error.message = message;
  return error;
}
