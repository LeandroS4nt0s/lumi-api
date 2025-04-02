import 'reflect-metadata'
import express, { Express } from 'express'
import { config as dotenvConfig } from 'dotenv'
import cors from 'cors'
import logger from './utils/Logger'
import AppRouter from './routers'
import { DataBaseService } from './services/database'

class Server {
  private LOCAL_ENV_URL: string
  private app: Express
  private port: string | number

  constructor() {
    this.app = express()
    this.port = process.env.PORT || 3000
    this.LOCAL_ENV_URL = 'http://localhost:3000'
    this.init()
  }

  private async init(): Promise<void> {
    try {
      this.loadEnvVariables()
      this.setMiddlewares()
      this.initializeDataBaseService()
      this.setRoutes()
      await this.startServer()
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

  private getCorsOptions(): string {
    return process.env.CORS_ORIGIN || this.LOCAL_ENV_URL
  }

  private setRoutes(): void {
    this.app.use('/api', AppRouter)
  }

  private async startServer(): Promise<void> {
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
  private async initializeDataBaseService() : Promise<void> {
     await DataBaseService.getInstance().initialize()
  }
}

new Server()
