import { DataSource } from "typeorm"
import { DataBaseInterface } from "../../../../domain/services/databaseInterface"
import { injectable } from "tsyringe"
import logger from "../../../services/internal/logger"
import { InvoiceModel } from "../../models/InvoiceModel"

@injectable()
export class MySQLImplementation implements DataBaseInterface<DataSource> {
  private dataBaseConnection!: DataSource
  private isInitialized = false

  async start(): Promise<void> {
    if (this.isInitialized) return

    try {
      this.dataBaseConnection = new DataSource({
        type: 'mysql',
        host: process.env.MYSQL_DB_HOST || 'localhost',
        port: Number(process.env.MYSQL_DB_PORT) || 3306,
        username: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || 'root',
        database: process.env.MYSQL_DATABASE || 'lumi_mysql_db',
        entities: [InvoiceModel],
        synchronize: true,
        logging: false
      })

      await this.dataBaseConnection.initialize()
      this.isInitialized = true
      logger.info(`[MySQL] Connected to ${this.dataBaseConnection.options.database}`)
    } catch (error) {
      logger.error('[MySQL] Error initializing the database:', error)
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
      logger.info('[MySQL] Connection closed.')
      this.isInitialized = false
    }
  }
}
