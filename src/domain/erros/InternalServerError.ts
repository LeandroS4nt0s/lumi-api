import { HttpError } from './HttpError'

/**
 * Represents an internal server error (HTTP status code 500).
 * This error is thrown when the server encounters an unexpected condition
 * that prevents it from fulfilling the request.
 */

export class InternalServerError extends HttpError {
  constructor(message = 'Internal Server Error') {
    super(message, 500)
  }
}