import { DataBaseInterface } from './databaseInterface'
import { DataSource } from 'typeorm'
import { MySQLImpl } from './implementation'

const DataBaseService: DataBaseInterface<DataSource> = MySQLImpl
export { DataBaseService }
