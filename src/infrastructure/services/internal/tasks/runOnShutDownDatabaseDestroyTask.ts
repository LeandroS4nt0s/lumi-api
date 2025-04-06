import { DataSource } from "typeorm";
import { container } from "../../../../container"
import { DataBaseInterface } from "../../../../domain/services/databaseInterface";
import logger from "../logger"

export async function runOnShutDownDatabaseDestroyTask() {
  try {
    const DataBaseService = container.resolve<DataBaseInterface<DataSource>>('DataBaseService')  
    await DataBaseService.stop();
  } catch (error) {
    logger.error('❌ Failed to close Database:', error)
  }
}
