import { InvoiceRepositoryInterface } from "../../domain/repositories/InvoiceRepositoryInterface";

 export const mockRepository: jest.Mocked<InvoiceRepositoryInterface> = {
    save: jest.fn(),
    findAll: jest.fn(),
    findByFilters: jest.fn()
  }