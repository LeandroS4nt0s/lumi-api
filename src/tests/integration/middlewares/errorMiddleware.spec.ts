
import request from 'supertest'
import express from 'express'
import { errorMiddleware } from '../../../presentation/http/middlewares/errorMiddleware'
import { NotFoundError } from '../../../domain/erros/NotFoundError'

const app = express()

// Rota que simula erro HttpError
app.get('/http-error', () => {
  throw new NotFoundError('Invoice not found')
})

// Rota que simula erro genérico
app.get('/generic-error', () => {
  throw new Error('Unexpected failure')
})

// Rota que simula erro desconhecido
app.get('/unknown-error', () => {
  throw 'Just a string'
})

// Aplica o middleware de erro depois das rotas
app.use(errorMiddleware)

describe('Error Middleware (integration)', () => {
  it('should handle HttpError (NotFound)', async () => {
    const response = await request(app).get('/http-error')
    expect(response.status).toBe(404)
    expect(response.body).toEqual({
      status: 'error',
      message: 'Invoice not found'
    })
  })

  it('should handle generic Error', async () => {
    const response = await request(app).get('/generic-error')
    expect(response.status).toBe(500)
    expect(response.body).toEqual({
      status: 'error',
      message: 'Internal server error',
      detail: 'Unexpected failure'
    })
  })

  it('should handle unknown error', async () => {
    const response = await request(app).get('/unknown-error')
    expect(response.status).toBe(500)
    expect(response.body).toEqual({
      status: 'error',
      message: 'Internal server error',
      detail: 'Unknown error'
    })
  })
})
