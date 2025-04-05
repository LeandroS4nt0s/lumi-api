import { InvoiceEntity } from "../entities/InvoiceEntity"

/**
 * Interface for the Invoice repository.
 * This interface defines the methods that the Invoice repository should implement.
 */

export interface InvoiceRepositoryInterface {
  save(invoice: InvoiceEntity): Promise<void>
  findByClient(clientNumber: string): Promise<InvoiceEntity[]>
  findByFilters(clientNumber?: string, month?: string): Promise<InvoiceEntity[]>
}
