import { HttpError } from './HttpError'

/**
 * UnauthorizedError is an error class that represents a 401 Unauthorized HTTP error.
 * It extends the HttpError class and sets the status code to 401.
 */

export class UnauthorizedError extends HttpError {
  constructor(message = 'Unauthorized') {
    super(message, 401)
  }
}