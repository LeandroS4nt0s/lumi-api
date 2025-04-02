import { DataSource } from 'typeorm'
import dotenv from 'dotenv'
import logger from '../../../src/utils/Logger'

dotenv.config()

describe('Database Connection - Integration', () => {
  let dataSource: DataSource

  beforeAll(async () => {
    jest.clearAllMocks();

    dataSource = new DataSource({
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

    await dataSource.initialize()

    if(dataSource.isInitialized)  logger.info( `Connected to database: ${dataSource.options.database} successfully`)
  })

  afterAll(async () => {
    await dataSource.destroy()
    if(!dataSource.isInitialized)  logger.info( `desconnected from database successfully`)
  })

  it('should successfully connect to the database MySQL', async () => {
    expect(dataSource.isInitialized).toBe(true)
  })
})
