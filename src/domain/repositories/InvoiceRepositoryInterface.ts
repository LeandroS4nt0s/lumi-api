import { FilterInvoicesDTO } from "../../application/use-cases/invoices/dtos/FilterInvoicesDTO"
import { InvoiceEntity } from "../entities/InvoiceEntity"

export interface InvoiceRepositoryInterface {
  save(invoice: InvoiceEntity): Promise<void>
  findAll(): Promise<InvoiceEntity[]>
  findByClient(clientNumber: string): Promise<InvoiceEntity[]>
  findByFilters(filterInvoicesDTO:FilterInvoicesDTO): Promise<InvoiceEntity[]>
}
