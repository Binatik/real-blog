import { ResponseErrorMessage } from "./api.types";

class ResponseError extends Error {
  name: string;
  body: ResponseErrorMessage;

  constructor(body: ResponseErrorMessage) {
    super();
    this.name = "ResponseError";
    this.body = body;
  }
}

class ApiError extends ResponseError {
  constructor(error: ResponseError) {
    super(error.body);
    this.name = "ApiError";
  }
}

export { ResponseError, ApiError };
