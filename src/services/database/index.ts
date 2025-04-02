import { DataBaseInterface } from './databaseInterface'
import { DataSource } from 'typeorm'
import { PostgresImpl } from './implementation'

const DataBaseService: DataBaseInterface<DataSource> = PostgresImpl
export { DataBaseService }
