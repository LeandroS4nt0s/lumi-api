import express from 'express'
import AppRouter from '../presentation/http'
import { errorMiddleware } from '../presentation/http/middlewares/errorMiddleware'

export function createTestApp() {
  const app = express()
  app.use(express.json())
  app.use('/api', AppRouter)
  app.use(errorMiddleware)
  return app
}