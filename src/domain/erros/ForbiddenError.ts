import { HttpError } from './HttpError'

/**
 * ForbiddenError is an error class that represents a 403 Forbidden HTTP error.
 * It extends the HttpError class and sets the status code to 403.
 */

export class ForbiddenError extends HttpError {
  constructor(message = 'Forbidden') {
    super(message, 403)
  }
}