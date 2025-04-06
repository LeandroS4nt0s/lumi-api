/**
 * @interface DataBaseInterface
 * @description This interface defines the contract for the database implementation.
 * It provides methods for starting, stopping, and getting the instance of the database.
 */

export interface DataBaseInterface<INSTANCE> {
  start(): Promise<void>
  getInstance(): INSTANCE
  stop(): Promise<void>
}
