import { HttpError } from './HttpError'

/**
 * NotFoundError is an error class that represents a 404 Not Found HTTP error.
 * It extends the HttpError class and sets the status code to 404.
 */

export class NotFoundError extends HttpError {
  constructor(message = 'Not Found') {
    super(message, 404)
  }
}