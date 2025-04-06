import { Request, Response, NextFunction } from 'express'
import { HttpError } from '../../../domain/erros/HttpError'
import { errorMiddleware } from '../../../presentation/http/middlewares/errorMiddleware'
import { InternalServerError } from '../../../domain/erros/InternalServerError'

const createMockResponse = () => {
  const res = {} as Partial<Response>
  res.status = jest.fn().mockReturnThis()
  res.json = jest.fn().mockReturnThis()
  return res as Response
}

describe('errorMiddleware (unit)', () => {
  it('should handle HttpError correctly', () => {
    const res = createMockResponse()
    const error =  new HttpError('Something went wrong', 400)

    errorMiddleware(error, {} as Request, res, {} as NextFunction)

    expect(error.statusCode).toBe(400)
    expect(res.json).toHaveBeenCalledWith({
      status: 'error',
      message: 'Something went wrong',
    })
  })

  it('should handle generic Error correctly', () => {
    const res = createMockResponse()
    const error = new InternalServerError('Internal Server Error')

    errorMiddleware(error, {} as Request, res, {} as NextFunction)

    expect(error.statusCode).toBe(500)
    expect(res.json).toHaveBeenCalledWith({
      status: 'error',
      message: 'Internal Server Error',
    })
  })

  it('should handle unknown error type', () => {
    const res = createMockResponse()
    const error = 'just a string'

    errorMiddleware(error, {} as Request, res, {} as NextFunction)
    expect(res.json).toHaveBeenCalledWith({
      status: 'error',
      message: 'Internal server error',
      detail: 'Unknown error',
    })
  })
})
