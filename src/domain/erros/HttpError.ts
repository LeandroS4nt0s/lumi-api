/**
 * Custom error class for HTTP errors.
 * It extends the built-in Error class and includes a status code.
 */

export class HttpError extends Error {
  constructor(public message: string, public statusCode = 500) {
    super(message)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}
  