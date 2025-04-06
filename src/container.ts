import { container } from 'tsyringe'
import { DataBaseInterface } from './domain/services/databaseInterface'
import { MySQLImplementation } from './infrastructure/database/implementation'
import { InvoiceExtractorInterface } from './domain/services/InvoiceExtractorInterface'
import { PDFInvoiceExtractorImpl } from './infrastructure/services/internal/extractor/PDFInvoiceExtractorImpl'
import { DriveServiceInterface } from './domain/services/DriveServiceInterface'
import { GoogleDriveServiceImpl } from './infrastructure/services/external/googledriveapi/GoogleDriveServiceImpl'
import { InvoiceRepositoryInterface } from './domain/repositories/InvoiceRepositoryInterface'
import { InvoiceRepositoryImpl } from './infrastructure/database/repositories/InvoiceRepositoryImpl'
import { ListAllInvoicesUseCase } from './application/use-cases/invoices/ListAllInvoicesUseCase'
import { ExtractInvoicesUseCase } from './application/use-cases/invoices/ExtractInvoicesUseCase'
import { ListFilteredInvoicesUseCase } from './application/use-cases/invoices/ListFilteredInvoicesUseCase'

// Registering the implementations
container.registerSingleton<DataBaseInterface<unknown>>('DataBaseService', MySQLImplementation)
container.register<DriveServiceInterface>('GoogleDriveService',GoogleDriveServiceImpl)
container.register<InvoiceExtractorInterface>('InvoiceExtractorImpl', PDFInvoiceExtractorImpl)
container.register<InvoiceRepositoryInterface>('InvoiceRepositoryImpl', InvoiceRepositoryImpl)

// Registering the use cases
container.register<ExtractInvoicesUseCase>('ExtractInvoicesUseCase',ExtractInvoicesUseCase)
container.register<ListAllInvoicesUseCase>('ListAllInvoicesUseCase',ListAllInvoicesUseCase)
container.register<ListFilteredInvoicesUseCase>('ListFilteredInvoicesUseCase',ListFilteredInvoicesUseCase)


export { container }
