import { ExtractInvoicesUseCase } from "../../../application/use-cases/invoices/ExtractInvoicesUseCase"
import { container } from "../../../container"
import logger from "../../../infrastructure/services/internal/logger"
import { runOnStartupExtractInvoicesTask } from "../../../infrastructure/services/internal/tasks/runOnStartupExtractInvoicesTask"


jest.mock('../../../container', () => ({
  container: {
    resolve: jest.fn(),
  },
}))

jest.mock('../../../infrastructure/services/internal/logger', () => ({
  info: jest.fn(),
  error: jest.fn(),
}))

describe('runOnStartupExtractInvoicesTask', () => {
  const mockExecute = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(container.resolve as jest.Mock).mockReturnValue({
      execute: mockExecute,
    })
  })

  it('should execute the ExtractInvoicesUseCase and log success', async () => {
    await runOnStartupExtractInvoicesTask()

    expect(container.resolve).toHaveBeenCalledWith(ExtractInvoicesUseCase)
    expect(mockExecute).toHaveBeenCalled()
    expect(logger.info).toHaveBeenCalledWith('🚀 Extracting invoices ...')
    expect(logger.info).toHaveBeenCalledWith('✅ Invoices extracted !')
  })

  it('should log error if execute fails', async () => {
    const error = new Error('execution failed')
    mockExecute.mockRejectedValueOnce(error)

    await runOnStartupExtractInvoicesTask()

    expect(logger.error).toHaveBeenCalledWith('❌ Failed to extract invoices:', error)
  })
})
