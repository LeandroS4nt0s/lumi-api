import { UnauthorizedError } from "../../../domain/erros/UnauthorizedError"

describe('UnauthorizedError', () => {
  it('should create an UnauthorizedError with default message', () => {
    const error = new UnauthorizedError()
    expect(error.message).toBe('Unauthorized')
    expect(error.statusCode).toBe(401)
    expect(error.name).toBe('UnauthorizedError')
    expect(error.stack).toBeDefined()
  })

  it('should create an UnauthorizedError with custom message', () => {
    const error = new UnauthorizedError('Invalid token')
    expect(error.message).toBe('Invalid token')
  })
})
