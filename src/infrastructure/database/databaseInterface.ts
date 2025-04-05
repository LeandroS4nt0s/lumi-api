export interface DataBaseInterface<INSTANCE> {
  start(): Promise<void>
  getInstance(): INSTANCE
  stop(): Promise<void>
}
