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
