import { ErrorMessages, ErrorNames } from "./constants";

// Custom error classes
export class NetworkError extends Error {
  constructor(message: string = ErrorMessages.NETWORK_FAILURE) {
    super(message);
    this.name = ErrorNames.NETWORK_ERROR;
  }
}

export class AuthRequiredError extends Error {
  constructor(message: string = ErrorMessages.AUTH_REQUIRED) {
    super(message);
    this.name = ErrorNames.AUTH_ERROR;
    this.cause = ErrorNames.UNAUTHORIZED_ERROR;
  }
}

export class ServerError extends Error {
  constructor(message: string = ErrorMessages.SERVER_ERROR) {
    super(message);
    this.name = ErrorNames.SERVER_ERROR;
    this.cause = ErrorNames.UNAUTHORIZED_ERROR;
  }
}

export class NotFoundError extends Error {
  constructor(message: string = ErrorMessages.NOT_FOUND) {
    super(message);
    this.name = ErrorNames.NOT_FOUND_ERROR;
    this.cause = ErrorNames.UNAUTHORIZED_ERROR;
  }
}

export class UnauthorizedError extends Error {
  constructor(
    message: string = ErrorMessages.UNAUTHORIZED,
  ) {
    super(message);
    this.name = ErrorNames.UNAUTHORIZED_ERROR;
    this.cause = ErrorNames.UNAUTHORIZED_ERROR
  }
}

export class ValidationError extends Error {
  constructor(message: string = ErrorMessages.VALIDATION_ERROR) {
    super(message);
    this.name = ErrorNames.VALIDATION_ERROR;
  }
}


