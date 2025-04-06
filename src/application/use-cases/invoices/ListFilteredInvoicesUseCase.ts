import { inject, injectable } from 'tsyringe'
import { InvoiceRepositoryInterface } from '../../../domain/repositories/InvoiceRepositoryInterface'
import { InvoiceEntity } from '../../../domain/entities/InvoiceEntity'
import { FilterInvoicesDTO } from './dtos/FilterInvoicesDTO'

/**
 * Use case for listing filtered invoices.
 * @class ListFilteredInvoicesUseCase 
 * @description This use case handles the listing of filtered invoices from the database.
 * It uses the InvoiceRepositoryInterface to retrieve the invoice data.
 * @example
 * const useCase = container.resolve(ListFilteredInvoicesUseCase)
 * const filters: FilterInvoicesDTO
 * const invoices = await useCase.execute(filters)  \
 */

@injectable()
export class ListFilteredInvoicesUseCase {
  constructor(
    @inject('InvoiceRepositoryImpl')
    private repository: InvoiceRepositoryInterface
  ) {}

  async execute(filters: FilterInvoicesDTO): Promise<InvoiceEntity[]> {
    return this.repository.findByFilters(filters)
  }
}