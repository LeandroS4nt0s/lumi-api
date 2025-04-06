import 'reflect-metadata'
import express, { Express } from 'express'
import cors from 'cors'
import { config as dotenvConfig } from 'dotenv'
import logger from './infrastructure/services/internal/logger'
import AppRouter from './presentation/http'
import { errorMiddleware } from './presentation/http/middlewares/errorMiddleware'
import { runOnStartupDataBaseStartTask } from './infrastructure/services/internal/tasks/runOnStartupDataBaseStartTask'
import { runOnStartupExtractInvoicesTask } from './infrastructure/services/internal/tasks/runOnStartupExtractInvoicesTask'
import { runOnShutDownCleanupInvoicesTableTask } from './infrastructure/services/internal/tasks/runOnShutDownCleanupInvoicesTableTask'
import { runOnShutDownDatabaseDestroyTask } from './infrastructure/services/internal/tasks/runOnShutDownDatabaseDestroyTask'

export class Server {
  private app: Express
  private port: string | number
  private LOCAL_ENV_URL = 'http://localhost:3000'

  constructor() {
    this.app = express()
    this.port = process.env.PORT || 3000
  }

  public async initialize(): Promise<void> {
    try {
      this.loadEnvVariables()
      await this.initializeInternalTasks()
      this.setMiddlewares()
      this.setRoutes() 
      this.setErrorHandler()
    } catch (error) {
      this.handleError(error)
    }
  }

  private loadEnvVariables(): void {
    dotenvConfig()

    if (!process.env.PORT) {
      logger.error('PORT is not defined in .env file')
      process.exit(1)
    }

    if (!process.env.CORS_ORIGIN) {
      logger.warn(
        `CORS_ORIGIN is not defined. Defaulting to ${this.LOCAL_ENV_URL}`
      )
    }
  }

  private setMiddlewares(): void {
    this.app.use(cors({ origin: this.getCorsOptions() }))
    this.app.use(express.json())
  }

  private setErrorHandler(): void {
    this.app.use(errorMiddleware)
  }

  private getCorsOptions(): string {
    return process.env.CORS_ORIGIN || this.LOCAL_ENV_URL
  }

  private setRoutes(): void {
    this.app.use('/api', AppRouter)
  }

  private  async initializeInternalTasks(): Promise<void> {
    await runOnStartupDataBaseStartTask();
    await runOnStartupExtractInvoicesTask()
  }

  public start(): void {
    this.app.listen(this.port, () => {
      logger.info(`Server is running on port ${this.port}`)
    })
  }

  private handleError(error: unknown): void {
    if (error instanceof Error) {
      logger.error(`Error during server initialization: ${error.message}`)
    } else {
      logger.error('Error during server initialization: Unknown error')
    }
  }
}
  

  // call to shutDown internal tasks
  let isShuttingDown = false
  const shutdown = async () => {
    if (isShuttingDown) return
    isShuttingDown = true
    try {
      logger.info('Gracefully shutting down...')
      await runOnShutDownCleanupInvoicesTableTask()
      await runOnShutDownDatabaseDestroyTask()
    } catch (error) {
      logger.error('Error during shutdown:', error)
    } finally {
      process.exit(0)
    }
  }

  process.on('SIGINT', shutdown)
  process.on('SIGTERM', shutdown)