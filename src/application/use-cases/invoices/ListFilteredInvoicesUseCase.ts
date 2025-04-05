import { inject, injectable } from 'tsyringe'
import { InvoiceRepositoryInterface } from '../../../domain/repositories/InvoiceRepositoryInterface'
import { InvoiceEntity } from '../../../domain/entities/InvoiceEntity'
import { FilterInvoicesDTO } from './dtos/FilterInvoicesDTO'

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