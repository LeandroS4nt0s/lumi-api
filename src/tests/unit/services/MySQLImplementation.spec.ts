jest.mock('../../../infrastructure/services/internal/logger', () => ({
    info: jest.fn(),
    error: jest.fn(),
}))
  
  import { DataSource } from 'typeorm'
  import { MySQLImplementation } from '../../../infrastructure/database/implementation'
  import { InternalServerError } from '../../../domain/erros/InternalServerError'
  
  const mockLogger = require('../../../infrastructure/services/internal/logger')
  
  jest.mock('typeorm', () => {
    const actual = jest.requireActual('typeorm')
    return {
      ...actual,
      DataSource: jest.fn().mockImplementation(() => ({
        initialize: jest.fn(),
        destroy: jest.fn(),
        options: { database: 'mock_mysql_db' },
      })),
    }
  })
  
  describe('MySQLImplementation', () => {
    let db: MySQLImplementation
  
    beforeEach(() => {
      db = new MySQLImplementation()
      jest.clearAllMocks()
    })
  
    it('should initialize the database connection', async () => {
      await db.start()
      expect(mockLogger.info).toHaveBeenCalledWith('[MySQL] Connected to mock_mysql_db')
      expect(() => db.getInstance()).not.toThrow()
    })
  
    it('should not re-initialize if already initialized', async () => {
      await db.start()
      await db.start()
      expect(mockLogger.info).toHaveBeenCalledTimes(1)
    })
  
    it('should throw error if getInstance is called before start', () => {
      expect(() => db.getInstance()).toThrow(InternalServerError)
    })
  
    it('should stop and destroy the connection', async () => {
      await db.start()
      await db.stop()
      expect(mockLogger.info).toHaveBeenCalledWith('[MySQL] Connection closed.')
    })
  
    it('should log and throw InternalServerError if initialization fails', async () => {
      const error = new Error('boom')
      ;(DataSource as jest.Mock).mockImplementation(() => ({
        initialize: jest.fn().mockRejectedValue(error),
        options: { database: 'mock_mysql_db' },
      }))
  
      const faultyDb = new MySQLImplementation()
      await expect(faultyDb.start()).rejects.toThrow(InternalServerError)
      expect(mockLogger.error).toHaveBeenCalledWith('[MySQL] Error initializing the database:', error)
    })
  })
  