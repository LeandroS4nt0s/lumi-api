import { inject, injectable } from 'tsyringe'
import { InvoiceRepositoryInterface } from '../../domain/repositories/InvoiceRepositoryInterface'
import { InvoiceExtractorInterface } from '../../domain/services/InvoiceExtractorInterface'
import { DriveServiceInterface } from '../../domain/services/DriveServiceInterface'

@injectable()
export class ExtractInvoicesUseCase {
  constructor(
    @inject('InvoiceRepositoryImpl') private repository: InvoiceRepositoryInterface,
    @inject('InvoiceExtractorImpl') private extractor: InvoiceExtractorInterface,
    @inject('GoogleDriveService') private driveService: DriveServiceInterface
  ) {}

  async execute(): Promise<void> {
    const files = await this.driveService.listAllInvoiceFilesGroupedByClient()

    for (const clientName in files) {
      const fileList = files[clientName]
      for (const file of fileList) {
        const buffer = await this.driveService.downloadFile(file.id)
        const invoice = await this.extractor.extractFromPDF(buffer, clientName)
        await this.repository.save(invoice)
      }
    }
  }
}
