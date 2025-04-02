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
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || 5432,
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || 'admin',
        database: process.env.DB_DATABASE || 'lumi_postgresl_db',
        entities: [],
        synchronize: true,
        logging: false
      })

      await this.dataBaseConnection.initialize()

      logger.info( `PostgreSQL connected to database: ${this.dataBaseConnection.options.database} successfully`)
      
    } catch (error) {
      logger.error('PostgreSQL => Error initializing the database:', error)
      throw new Error('PostgreSQL => Database initialization failed')
    }
  }

  getInstance(): DataSource {
    if (!this.dataBaseConnection.isInitialized) {
      throw new Error('PostgreSQL => Database connection is not initialized')
    }
    return this.dataBaseConnection
  }
}

const PostgresImpl = new PostgresImplementation()
export { PostgresImpl }
