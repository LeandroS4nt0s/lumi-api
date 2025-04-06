import "reflect-metadata"
import { ExtractInvoicesUseCase } from '../../../application/use-cases/invoices/ExtractInvoicesUseCase'
import { mockRepository } from "../../mocks/repository"
import { mockExtractor } from "../../mocks/extractor"
import { mockDriveService } from "../../mocks/driverService"

describe('ExtractInvoicesUseCase', () => {
  const extractInvoicesUseCase = new ExtractInvoicesUseCase(mockRepository, mockExtractor, mockDriveService)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should extract and save all invoices from Google Drive', async () => {
    const fakeFilesGrouped = {
      '1234567890': [
        { id: 'file-1', name: 'fatura-janeiro.pdf', mimeType: 'application/pdf' },
        { id: 'file-2', name: 'fatura-fevereiro.pdf', mimeType: 'application/pdf' }
      ]
    }

    const fakeBuffer = Buffer.from('pdf-content')

    const fakeInvoice1 = { id: 'invoice-1' } as any
    const fakeInvoice2 = { id: 'invoice-2' } as any

    mockDriveService.listAllInvoiceFilesGroupedByClient.mockResolvedValue(fakeFilesGrouped)
    mockDriveService.downloadFile.mockResolvedValue(fakeBuffer)
    mockExtractor.extractFromPDF
      .mockResolvedValueOnce(fakeInvoice1)
      .mockResolvedValueOnce(fakeInvoice2)

    await extractInvoicesUseCase.execute()

    expect(mockDriveService.listAllInvoiceFilesGroupedByClient).toHaveBeenCalled()
    expect(mockDriveService.downloadFile).toHaveBeenCalledTimes(2)
    expect(mockDriveService.downloadFile).toHaveBeenCalledWith('file-1')
    expect(mockDriveService.downloadFile).toHaveBeenCalledWith('file-2')

    expect(mockExtractor.extractFromPDF).toHaveBeenCalledTimes(2)
    expect(mockExtractor.extractFromPDF).toHaveBeenCalledWith(fakeBuffer, '1234567890')

    expect(mockRepository.save).toHaveBeenCalledTimes(2)
    expect(mockRepository.save).toHaveBeenCalledWith(fakeInvoice1)
    expect(mockRepository.save).toHaveBeenCalledWith(fakeInvoice2)
  })
})
