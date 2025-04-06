import { ExtractInvoicesUseCase } from "../../../../application/use-cases/invoices/ExtractInvoicesUseCase"
import { container } from "../../../../container"
import logger from "../logger"

export async function runOnStartupExtractInvoicesTask() {
  try {
    logger.info('🚀 Extracting invoices ...')
    const useCase = container.resolve(ExtractInvoicesUseCase)
    await useCase.execute()
    logger.info('✅ Invoices extracted !')
  } catch (error) {
    logger.error('❌ Failed to extract invoices:', error)
  }
}
