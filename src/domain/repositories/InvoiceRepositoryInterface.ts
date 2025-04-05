import { InvoiceEntity } from "../entities/InvoiceEntity"

export interface InvoiceRepositoryInterface {
  save(invoice: InvoiceEntity): Promise<void>
  findAll(): Promise<InvoiceEntity[]>
  findByClient(clientNumber: string): Promise<InvoiceEntity[]>
  findByFilters(clientNumber?: string, month?: string): Promise<InvoiceEntity[]>
}
