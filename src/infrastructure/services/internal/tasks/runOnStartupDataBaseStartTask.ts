import { DataSource } from "typeorm"
import { container } from "../../../../container"
import logger from "../logger"
import { DataBaseInterface } from "../../../../domain/services/databaseInterface"

export async function runOnStartupDataBaseStartTask() {
  try {
    const DataBaseService = container.resolve<DataBaseInterface<DataSource>>('DataBaseService')  
    await DataBaseService.start();
  } catch (error) {
    logger.error('❌ Failed to Start Database:', error)
  }
}
