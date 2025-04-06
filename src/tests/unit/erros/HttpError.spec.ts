import { HttpError } from "../../../domain/erros/HttpError"

describe('HttpError', () => {
  it('should create an error with default status code 500', () => {
    const error = new HttpError('Something went wrong')
    expect(error.message).toBe('Something went wrong')
    expect(error.statusCode).toBe(500)
    expect(error.name).toBe('HttpError')
    expect(error.stack).toBeDefined()
  })

  it('should create an error with a custom status code', () => {
    const error = new HttpError('Not Found', 404)
    expect(error.statusCode).toBe(404)
  })
})
