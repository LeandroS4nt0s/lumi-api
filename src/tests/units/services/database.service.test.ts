import 'reflect-metadata'
import '../../../container'
import { DataSource } from 'typeorm'
import logger from '../../../infrastructure/logger'
import { DataBaseInterface } from '../../../infrastructure/database/databaseInterface'
import { container } from '../../../container'

jest.mock('typeorm', () => {
  const mockDataSource = {
    isInitialized: false,
    options: { database: 'mock_db' },
    initialize: jest.fn().mockImplementation(async function (this: typeof mockDataSource) {
      this.isInitialized = true
      return this
    }),
    destroy: jest.fn().mockImplementation(async function (this: typeof mockDataSource) {
      this.isInitialized = false
    })
  }

  return {
    DataSource: jest.fn(() => mockDataSource)
  }
})

describe('Database Service - Unit', () => {
  const DataBaseService = container.resolve<DataBaseInterface<unknown>>('DataBaseService')
  let databaseService: DataSource

  beforeAll(async () => {
    jest.clearAllMocks()

    databaseService = DataBaseService.getInstance() as DataSource
    await databaseService.initialize()
  })

  afterAll(async () => {
    await databaseService.destroy()
    if (!databaseService.isInitialized) {
      logger.info('Disconnected from database successfully')
    }
  })

  it('should initialize the Database connection successfully', async () => {
    await expect(databaseService.initialize()).resolves.not.toThrow()
    expect(databaseService.isInitialized).toBe(true)
  })

  it('should return false if database is not initialized', async () => {
    await databaseService.destroy()
    expect(databaseService.isInitialized).toBe(false)
  })
})
