import logger from "../../../infrastructure/services/internal/logger"

describe('Logger', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {})
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should have info, error and warn methods', () => {
    expect(typeof logger.info).toBe('function')
    expect(typeof logger.error).toBe('function')
    expect(typeof logger.warn).toBe('function')
  })

  it('should call logger.info without throwing', () => {
    expect(() => logger.info('Test info message')).not.toThrow()
  })

  it('should call logger.error without throwing', () => {
    expect(() => logger.error('Test error message')).not.toThrow()
  })

  it('should call logger.warn without throwing', () => {
    expect(() => logger.warn('Test warn message')).not.toThrow()
  })
})
