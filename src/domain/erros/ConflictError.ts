import { HttpError } from './HttpError'

/**
 * ConflictError class
 * @extends HttpError
 * @classdesc Represents a conflict error (409)
 * @param {string} message - The error message
 */


export class ConflictError extends HttpError {
  constructor(message = 'Conflict') {
    super(message, 409)
  }
}