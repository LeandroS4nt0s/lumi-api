import { DataSource } from 'typeorm'
import { DataBaseInterface } from '../../databaseInterface'
import logger from '../../../../utils/Logger'

class PostgresImplementation implements DataBaseInterface<DataSource> {
  private dataBaseConnection!: DataSource

  constructor() {
    this.start()
  }

  async start(): Promise<void> {
    try {
      this.dataBaseConnection = new DataSource({
        type: 'postgres',
        host: process.env.POSTGRES_DB_HOST || 'localhost',
        port: Number(process.env.POSTGRES_DB_PORT) || 5432,
        username: process.env.POSTGRES_USER || 'root',
        password: process.env.POSTGRES_PASSWORD || 'root',
        database: process.env.POSTGRES_DB || 'lumi_postgresql_db',
        entities: [],
        synchronize: true,
        logging: false
      })

      await this.dataBaseConnection.initialize()

      logger.info( `PostgreSQL connected to database: ${this.dataBaseConnection.options.database} successfully`)
      
    } catch (error) {
      logger.error('PostgreSQL => Error initializing the database:', error)
    }
  }

  getInstance(): DataSource {
    return this.dataBaseConnection
  }
}

export const PostgresImpl = new PostgresImplementation()
