import { container } from 'tsyringe'
import { DataBaseInterface } from './infrastructure/database/databaseInterface'
import { MySQLImplementation } from './infrastructure/database/implementation'

container.register<DataBaseInterface<unknown>>('DataBaseService', {useClass: MySQLImplementation})

export { container }
