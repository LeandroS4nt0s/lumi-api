import { inject, injectable } from 'tsyringe'
import { InvoiceRepositoryInterface } from '../../../domain/repositories/InvoiceRepositoryInterface'
import { InvoiceExtractorInterface } from '../../../domain/services/InvoiceExtractorInterface'
import { DriveServiceInterface } from '../../../domain/services/DriveServiceInterface'

/**
 * Use case for extracting invoices from Google Drive and saving them to the database.
 * @class ExtractInvoicesUseCase
 * @description This use case handles the extraction of invoices from Google Drive and saves them to the database.
 * It uses the InvoiceExtractorInterface to extract invoice data from PDF files and the InvoiceRepositoryInterface to save the extracted data.
 * @example
 * const useCase = container.resolve(ExtractInvoicesUseCase)  
 * await useCase.execute()
 */

@injectable()
export class ExtractInvoicesUseCase {
  constructor(
    @inject('InvoiceRepositoryImpl') private repository: InvoiceRepositoryInterface,
    @inject('InvoiceExtractorImpl') private extractor: InvoiceExtractorInterface,
    @inject('GoogleDriveService') private driveService: DriveServiceInterface
  ) {}

  async execute(): Promise<void> {
    const instalationFiles = await this.driveService.listAllInvoiceFilesGroupedByClient()

    for (const instalationNumber in instalationFiles) {
      const fileList = instalationFiles[instalationNumber]
      for (const file of fileList) {
        const buffer = await this.driveService.downloadFile(file.id)
        const invoice = await this.extractor.extractFromPDF(buffer, instalationNumber)
        await this.repository.save(invoice)
      }
    }
  }
}
