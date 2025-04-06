import { DataSource } from "typeorm"
import { container } from "../../../../container"
import logger from "../logger"
import { InvoiceModel } from "../../../database/models/InvoiceModel"
import { DataBaseInterface } from "../../../../domain/services/databaseInterface"


export async function runOnShutDownCleanupInvoicesTableTask() {
  try {
    logger.info('🧹 Cleaning invoices table...')
    const DataBaseService = container.resolve<DataBaseInterface<DataSource>>('DataBaseService')  
    await DataBaseService.getInstance().getRepository(InvoiceModel).clear();
    logger.info('✅ Invoices table cleaned.')
  } catch (error) {
    logger.error('❌ Failed to clean invoices table:', error)
  }
}
