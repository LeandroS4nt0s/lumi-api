
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express'
import { HttpError } from '../../../domain/erros/HttpError'

/**
 * Middleware for handling errors in the application.
 * It catches errors thrown in the application and sends a JSON response with the error details.
 */

export const errorMiddleware: ErrorRequestHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  let statusCode = 500
  let message = 'Internal server error'
  let errorDetail: string | undefined

  if (err instanceof HttpError) {
    statusCode = err.statusCode
    message = err.message
  } else if (err instanceof Error) {
    errorDetail = err.message
  } else {
    errorDetail = 'Unknown error'
  }
}
