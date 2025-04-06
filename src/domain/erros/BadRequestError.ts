import { HttpError } from './HttpError'

/**
 * BadRequestError is an error class that represents a 400 Bad Request HTTP error.
 * It extends the HttpError class and sets the status code to 400.
 */

export class BadRequestError extends HttpError {
  constructor(message = 'Bad Request') {
    super(message, 400)
  }
}