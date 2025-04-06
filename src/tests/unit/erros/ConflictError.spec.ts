import { ConflictError } from "../../../domain/erros/ConflictError"

describe('ConflictError', () => {
  it('should create a ConflictError with default message', () => {
    const error = new ConflictError()
    expect(error.message).toBe('Conflict')
    expect(error.statusCode).toBe(409)
    expect(error.name).toBe('ConflictError')
    expect(error.stack).toBeDefined()
  })

  it('should create a ConflictError with custom message', () => {
    const error = new ConflictError('Resource already exists')
    expect(error.message).toBe('Resource already exists')
  })
})
