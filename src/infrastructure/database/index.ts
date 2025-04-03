import { DataBaseInterface } from './databaseInterface'
import { container } from '../../container'

export const DataBaseService = container.resolve<DataBaseInterface<unknown>>('DataBaseService')
