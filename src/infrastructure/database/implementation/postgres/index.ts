import { DataSource } from 'typeorm'
import { DataBaseInterface } from '../../databaseInterface'
import logger from '../../../logger'
import { injectable } from 'tsyringe'
import { InvoiceModel } from '../../models/InvoiceModel'

@injectable()
export class PostgresImplementation implements DataBaseInterface<DataSource> {
  private dataBaseConnection!: DataSource
  private isInitialized = false

  async start(): Promise<void> {
    if (this.isInitialized) return
    
    try {
      this.dataBaseConnection = new DataSource({
        type: 'postgres',
        host: process.env.POSTGRES_DB_HOST || 'localhost',
        port: Number(process.env.POSTGRES_DB_PORT) || 5432,
        username: process.env.POSTGRES_USER || 'root',
        password: process.env.POSTGRES_PASSWORD || 'root',
        database: process.env.POSTGRES_DB || 'lumi_postgresql_db',
        entities: [InvoiceModel],
        synchronize: true,
        logging: false
      })

      await this.dataBaseConnection.initialize()
      this.isInitialized = true
      logger.info(`[PostgreSQL] Connected to ${this.dataBaseConnection.options.database}`)
      
    } catch (error) {
      logger.error('[PostgreSQL] Error initializing the database:', error)
    }
  }

  getInstance(): DataSource {
    if (!this.isInitialized) {
      throw new Error('Database is not initialized. Call start() first.')
    }
    return this.dataBaseConnection
  }

  async stop(): Promise<void> {
    if (this.isInitialized) {
      await this.dataBaseConnection.destroy()
      logger.info('[PostgreSQL] Connection closed.')
      this.isInitialized = false
    }
  }
}
