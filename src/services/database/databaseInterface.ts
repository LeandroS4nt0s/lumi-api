export interface DataBaseInterface<INSTANCE> {
  start(): void
  getInstance(): INSTANCE
}
