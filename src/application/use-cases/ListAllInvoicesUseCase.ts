import { inject, injectable } from 'tsyringe'
import { InvoiceRepositoryInterface } from '../../domain/repositories/InvoiceRepositoryInterface'
import { InvoiceEntity } from '../../domain/entities/InvoiceEntity'

@injectable()
export class ListAllInvoicesUseCase {
  constructor(
    @inject('InvoiceRepositoryImpl') private repository: InvoiceRepositoryInterface) {}

  async execute(): Promise<InvoiceEntity[]> {
    return this.repository.findAll()
  }
}
