import { InternalServerError } from "../../../domain/erros/InternalServerError"

describe('InternalServerError', () => {
  it('should create an InternalServerError with default message', () => {
    const error = new InternalServerError()
    expect(error.message).toBe('Internal Server Error')
    expect(error.statusCode).toBe(500)
    expect(error.name).toBe('InternalServerError')
    expect(error.stack).toBeDefined()
  })

  it('should create an InternalServerError with custom message', () => {
    const error = new InternalServerError('Something went wrong')
    expect(error.message).toBe('Something went wrong')
  })
})
