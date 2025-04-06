import { NotFoundError } from "../../../domain/erros/NotFoundError"

describe('NotFoundError', () => {
  it('should create a NotFoundError with default message', () => {
    const error = new NotFoundError()
    expect(error.message).toBe('Not Found')
    expect(error.statusCode).toBe(404)
    expect(error.name).toBe('NotFoundError')
    expect(error.stack).toBeDefined()
  })

  it('should create a NotFoundError with custom message', () => {
    const error = new NotFoundError('Item not found')
    expect(error.message).toBe('Item not found')
  })
})
