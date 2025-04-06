import { container } from "../../../container"
import logger from "../../../infrastructure/services/internal/logger"
import { runOnStartupDataBaseStartTask } from "../../../infrastructure/services/internal/tasks/runOnStartupDataBaseStartTask"


jest.mock('../../../container', () => ({
  container: {
    resolve: jest.fn(),
  },
}))

jest.mock('../../../infrastructure/services/internal/logger', () => ({
  error: jest.fn(),
}))

describe('runOnStartupDataBaseStartTask', () => {
  const mockStart = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks();
    (container.resolve as jest.Mock).mockReturnValue({
      start: mockStart,
    })
  })

  it('should call start on the database service', async () => {
    await runOnStartupDataBaseStartTask()

    expect(container.resolve).toHaveBeenCalledWith('DataBaseService')
    expect(mockStart).toHaveBeenCalled()
  })

  it('should log error if start throws', async () => {
    const error = new Error('start failed')
    mockStart.mockRejectedValueOnce(error)

    await runOnStartupDataBaseStartTask()

    expect(logger.error).toHaveBeenCalledWith('❌ Failed to Start Database:', error)
  })
})
