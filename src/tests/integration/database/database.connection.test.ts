import 'reflect-metadata'
import '../../../container'
import { DataSource } from 'typeorm'
import dotenv from 'dotenv'
import logger from '../../../infrastructure/logger'
import { container } from '../../../container'
import { DataBaseInterface } from '../../../infrastructure/database/databaseInterface'

dotenv.config()

describe('Database Connection - Integration', () => {
  const DataBaseService = container.resolve<DataBaseInterface<unknown>>('DataBaseService')
  let dataSource: DataSource

  beforeAll(async () => {
    jest.clearAllMocks()

    dataSource = DataBaseService.getInstance() as DataSource

    await dataSource.initialize()

    if (!dataSource.isInitialized) {
      throw new Error('Database connection failed')
    }

    logger.info(`Connected to database: ${dataSource.options.database} successfully`)
  })

  afterAll(async () => {
    if (dataSource.isInitialized) {
      await dataSource.destroy()
      logger.info('Disconnected from database successfully')
    }
  })

  it('should successfully connect to the database MySQL', async () => {
    expect(dataSource.isInitialized).toBe(true)
  })
})
