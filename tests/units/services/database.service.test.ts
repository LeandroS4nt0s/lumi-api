import { DataSource } from "typeorm"
import { DataBaseService } from "../../../src/services/database"
import logger from "../../../src/utils/Logger"

jest.mock('typeorm', () => ({
  DataSource: jest.fn().mockImplementation(() => ({
    isInitialized: false,
    options: { database: "mock_db" },
    initialize: jest.fn().mockResolvedValue(true),
    destroy: jest.fn().mockResolvedValue(true),
  })),
}))

describe('Database Service - Unit', () => {  
  let databaseService:  DataSource

  afterAll(async () => {
    await databaseService.destroy()
    if(!databaseService.isInitialized)  logger.info( `desconnected from database successfully`)
  })

  it('should initialize the Database connection successfully', async () => {
    databaseService = DataBaseService.getInstance();
    await expect(databaseService.initialize()).resolves.not.toThrow()
    await databaseService.destroy();
    expect(databaseService.isInitialized).toBe(false);
  })

  it('should response a boolean false if database is not initialized', () => {
    expect(databaseService.isInitialized.valueOf()).toBe(false)
  })
})
