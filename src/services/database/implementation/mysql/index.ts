import { DataSource } from 'typeorm'
import { DataBaseInterface } from '../../databaseInterface'
import logger from '../../../../utils/Logger'

class MySQLImplementation implements DataBaseInterface<DataSource> {
  private dataBaseConnection!: DataSource

  constructor() {
    this.start()
  }

  async start(): Promise<void> {
    try {
      this.dataBaseConnection = new DataSource({
        type: 'mysql',
        host: process.env.MYSQL_DB_HOST || 'localhost',
        port: Number(process.env.MYSQL_DB_PORT) || 3306,
        username: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || 'root',
        database: process.env.MYSQL_DATABASE || 'lumi_mysql_db',
        entities: [],
        synchronize: true,
        logging: false
      })

      await this.dataBaseConnection.initialize()

      logger.info( `MySQL connected to database: ${this.dataBaseConnection.options.database} successfully`)
      
    } catch (error) {
      logger.error('MySQL => Error initializing the database:', error)
      throw new Error('MySQL => Database initialization failed')
    }
  }

  getInstance(): DataSource {
    if (!this.dataBaseConnection.isInitialized) {
      throw new Error('MySQL => Database connection is not initialized')
    }
    return this.dataBaseConnection
  }
}

const MySQLImpl = new MySQLImplementation()
export { MySQLImpl }
