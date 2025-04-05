import { container } from 'tsyringe'
import { DataBaseInterface } from './infrastructure/database/databaseInterface'
import { MySQLImplementation } from './infrastructure/database/implementation'
import { InvoiceExtractorInterface } from './domain/services/InvoiceExtractorInterface'
import { PDFInvoiceExtractorImpl } from './infrastructure/extrator/PDFInvoiceExtractorImpl'
import { ExtractInvoicesUseCase } from './application/use-cases/ExtractInvoicesUseCase'
import { DriveServiceInterface } from './domain/services/DriveServiceInterface'
import { GoogleDriveService } from './infrastructure/external/GoogleDriveService'
import { InvoiceRepositoryInterface } from './domain/repositories/InvoiceRepositoryInterface'
import { InvoiceRepositoryImpl } from './infrastructure/database/repositories/InvoiceRepositoryImpl'
import { ListAllInvoicesUseCase } from './application/use-cases/ListAllInvoicesUseCase'

container.registerSingleton<DataBaseInterface<unknown>>('DataBaseService', MySQLImplementation)
container.register<InvoiceExtractorInterface>('InvoiceExtractorImpl', PDFInvoiceExtractorImpl)
container.register<ExtractInvoicesUseCase>('ExtractInvoicesUseCase',ExtractInvoicesUseCase)
container.register<ListAllInvoicesUseCase>('ListAllInvoicesUseCase',ListAllInvoicesUseCase)
container.register<DriveServiceInterface>('GoogleDriveService',GoogleDriveService)
container.register<InvoiceRepositoryInterface>('InvoiceRepositoryImpl', InvoiceRepositoryImpl)

export { container }
