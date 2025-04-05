import { container } from 'tsyringe'
import { DataBaseInterface } from './infrastructure/database/databaseInterface'
import { MySQLImplementation } from './infrastructure/database/implementation'
import { InvoiceExtractorInterface } from './domain/services/InvoiceExtractorInterface'
import { PDFInvoiceExtractorImpl } from './infrastructure/extrator/PDFInvoiceExtractorImpl'
import { DriveServiceInterface } from './domain/services/DriveServiceInterface'
import { GoogleDriveService } from './infrastructure/external/GoogleDriveService'
import { InvoiceRepositoryInterface } from './domain/repositories/InvoiceRepositoryInterface'
import { InvoiceRepositoryImpl } from './infrastructure/database/repositories/InvoiceRepositoryImpl'
import { ListAllInvoicesUseCase } from './application/use-cases/invoices/ListAllInvoicesUseCase'
import { ExtractInvoicesUseCase } from './application/use-cases/invoices/ExtractInvoicesUseCase'
import { ListFilteredInvoicesUseCase } from './application/use-cases/invoices/ListFilteredInvoicesUseCase'

// Registering the database implementation
container.registerSingleton<DataBaseInterface<unknown>>('DataBaseService', MySQLImplementation)

// Registering the googledrive api implementation
container.register<DriveServiceInterface>('GoogleDriveService',GoogleDriveService)

// Registering the invoice extractor implementation
container.register<InvoiceExtractorInterface>('InvoiceExtractorImpl', PDFInvoiceExtractorImpl)

// Registering the invoice repository implementation
container.register<InvoiceRepositoryInterface>('InvoiceRepositoryImpl', InvoiceRepositoryImpl)

// Registering the use cases
container.register<ExtractInvoicesUseCase>('ExtractInvoicesUseCase',ExtractInvoicesUseCase)
container.register<ListAllInvoicesUseCase>('ListAllInvoicesUseCase',ListAllInvoicesUseCase)
container.register<ListFilteredInvoicesUseCase>('ListFilteredInvoicesUseCase',ListFilteredInvoicesUseCase)


export { container }
