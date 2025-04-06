import { FilterInvoicesDTO } from "../../application/use-cases/invoices/dtos/FilterInvoicesDTO"
import { InvoiceEntity } from "../entities/InvoiceEntity"

/**
 * @interface InvoiceRepositoryInterface
 * @description This interface defines the contract for the Invoice repository Implematation.
 * It provides methods for saving invoices, finding all invoices, and finding invoices by filters.
 */

export interface InvoiceRepositoryInterface {
  save(invoice: InvoiceEntity): Promise<void>
  findAll(): Promise<InvoiceEntity[]>
  findByFilters(filterInvoicesDTO:FilterInvoicesDTO): Promise<InvoiceEntity[]>
}
