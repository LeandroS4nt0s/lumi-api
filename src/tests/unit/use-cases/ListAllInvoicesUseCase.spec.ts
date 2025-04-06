
import "reflect-metadata"
import { ListAllInvoicesUseCase } from "../../../application/use-cases/invoices/ListAllInvoicesUseCase";
import { InvoiceRepositoryInterface } from "../../../domain/repositories/InvoiceRepositoryInterface";
import { mockInvoices } from "../../mocks/invoices";

describe("ListAllInvoicesUseCase", () => {
  let useCase: ListAllInvoicesUseCase;
  let mockRepository: jest.Mocked<InvoiceRepositoryInterface>;

  beforeEach(() => {
    mockRepository = {
      findAll: jest.fn(),
      findByFilters: jest.fn(),
      save: jest.fn()
    };

    useCase = new ListAllInvoicesUseCase(mockRepository);
  });

  it("should return all invoices from repository", async () => {
   
    mockRepository.findAll.mockResolvedValue(mockInvoices);

    const result = await useCase.execute();

    expect(result).toEqual(mockInvoices);
    expect(mockRepository.findAll).toHaveBeenCalledTimes(1);
    expect(result[0].customerNumber).toBe("000");
    expect(result[1].referenceMonth).toBe("FEV/2024");
    expect(result[1].customerNumber).toBe("123456");
    expect(result[0].referenceMonth).toBe("JAN/2024");
  });
});
