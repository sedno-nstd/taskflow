export class ApiError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }

  static badRequest(message: string) {
    return new ApiError(400, message);
  }

  static unauthorized(message: string) {
    return new ApiError(401, message);
  }

  static conflicts(message: string) {
    return new ApiError(409, message);
  }

  static internal(message: string) {
    return new ApiError(500, message);
  }
}
