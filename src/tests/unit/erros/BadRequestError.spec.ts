import { BadRequestError } from "../../../domain/erros/BadRequestError"

describe('BadRequestError', () => {
  it('should create a BadRequestError with default message', () => {
    const error = new BadRequestError()
    expect(error.message).toBe('Bad Request')
    expect(error.statusCode).toBe(400)
    expect(error.name).toBe('BadRequestError')
    expect(error.stack).toBeDefined()
  })

  it('should create a BadRequestError with custom message', () => {
    const error = new BadRequestError('Invalid data')
    expect(error.message).toBe('Invalid data')
  })
})
