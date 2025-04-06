import { DataSource } from 'typeorm'
import { container } from '../../../container'
import { runOnShutDownCleanupInvoicesTableTask } from '../../../infrastructure/services/internal/tasks/runOnShutDownCleanupInvoicesTableTask'
import logger from '../../../infrastructure/services/internal/logger'


jest.mock('../../../infrastructure/services/internal/logger', () => ({
  info: jest.fn(),
  error: jest.fn(),
}))

jest.mock('../../../container', () => ({
  container: {
    resolve: jest.fn(),
  },
}))

describe('runOnShutDownCleanupInvoicesTableTask', () => {
  const mockClear = jest.fn()
  const mockGetRepository = jest.fn().mockReturnValue({ clear: mockClear })
  const mockDataSource = { getRepository: mockGetRepository } as unknown as DataSource
  const mockDbService = { getInstance: jest.fn().mockReturnValue(mockDataSource) }

  beforeEach(() => {
    jest.clearAllMocks();
    (container.resolve as jest.Mock).mockReturnValue(mockDbService)
  })

  it('should clean the invoices table successfully', async () => {
    await runOnShutDownCleanupInvoicesTableTask()

    expect(container.resolve).toHaveBeenCalledWith('DataBaseService')
    expect(mockClear).toHaveBeenCalled()
    expect(logger.info).toHaveBeenCalledWith('🧹 Cleaning invoices table...')
    expect(logger.info).toHaveBeenCalledWith('✅ Invoices table cleaned.')
  })

  it('should log error if cleaning fails', async () => {
    const error = new Error('DB failure')
    mockClear.mockRejectedValueOnce(error)

    await runOnShutDownCleanupInvoicesTableTask()

    expect(logger.info).toHaveBeenCalledWith('🧹 Cleaning invoices table...')
    expect(logger.error).toHaveBeenCalledWith('❌ Failed to clean invoices table:', error)
  })
})
