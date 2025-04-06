import { Request, Response, NextFunction, RequestHandler } from 'express'

/**
 * Middleware to handle async errors in Express.js.
 * @param fn - The async function to be executed.
 * @returns A middleware function that catches errors and passes them to the next middleware.
 */

export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
): RequestHandler => {
  return (req, res, next) => {
    fn(req, res, next).catch(next)
  }
}
