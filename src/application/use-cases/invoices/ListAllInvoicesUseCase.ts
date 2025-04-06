import { inject, injectable } from 'tsyringe'
import { InvoiceRepositoryInterface } from '../../../domain/repositories/InvoiceRepositoryInterface'
import { InvoiceEntity } from '../../../domain/entities/InvoiceEntity'

/**
 * Use case for listing all invoices.
 * @class ListAllInvoicesUseCase
 * @description This use case handles the listing of all invoices from the database.
 * It uses the InvoiceRepositoryInterface to retrieve the invoice data.
 * @example
 * const useCase = container.resolve(ListAllInvoicesUseCase)  
 * const invoices = await useCase.execute()
 */

@injectable()
export class ListAllInvoicesUseCase {
  constructor(
    @inject('InvoiceRepositoryImpl') private repository: InvoiceRepositoryInterface) {}

  async execute(): Promise<InvoiceEntity[]> {
    return this.repository.findAll()
  }
}
