import { container } from "../../../container"
import logger from "../../../infrastructure/services/internal/logger"
import { runOnShutDownDatabaseDestroyTask } from "../../../infrastructure/services/internal/tasks/runOnShutDownDatabaseDestroyTask"

jest.mock('../../../container', () => ({
  container: {
    resolve: jest.fn(),
  },
}))

jest.mock('../../../infrastructure/services/internal/logger', () => ({
  error: jest.fn(),
}))

describe('runOnShutDownDatabaseDestroyTask', () => {
  const mockStop = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks();
    (container.resolve as jest.Mock).mockReturnValue({
      stop: mockStop,
    })
  })

  it('should call stop on the database service', async () => {
    await runOnShutDownDatabaseDestroyTask()

    expect(container.resolve).toHaveBeenCalledWith('DataBaseService')
    expect(mockStop).toHaveBeenCalled()
  })

  it('should log error if stop throws', async () => {
    const error = new Error('boom')
    mockStop.mockRejectedValueOnce(error)

    await runOnShutDownDatabaseDestroyTask()

    expect(logger.error).toHaveBeenCalledWith('❌ Failed to close Database:', error)
  })
})
