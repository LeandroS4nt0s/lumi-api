import "reflect-metadata"
import { InvoiceRepositoryInterface } from '../../../domain/repositories/InvoiceRepositoryInterface'
import { ListFilteredInvoicesUseCase } from '../../../application/use-cases/invoices/ListFilteredInvoicesUseCase'
import { FilterInvoicesDTO } from '../../../application/use-cases/invoices/dtos/FilterInvoicesDTO'
import { mockInvoices } from "../../mocks/invoices"

describe('ListFilteredInvoicesUseCase', () => {
  const mockRepository: jest.Mocked<InvoiceRepositoryInterface> = {
    save: jest.fn(),
    findAll: jest.fn(),
    findByFilters: jest.fn()
  }

  const sut = new ListFilteredInvoicesUseCase(mockRepository)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should call repository with filters and return invoices', async () => {
    const filters: FilterInvoicesDTO = {
      clientNumber: '000',
      month: 'JAN/2024'
    }


    mockRepository.findByFilters.mockResolvedValue(mockInvoices)

    const result = await sut.execute(filters)

    expect(mockRepository.findByFilters).toHaveBeenCalledWith(filters)
    expect(result).toEqual(mockInvoices)
  })
})
