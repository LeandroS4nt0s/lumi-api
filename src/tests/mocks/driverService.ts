import { DriveServiceInterface } from "../../domain/services/DriveServiceInterface";

 export const mockDriveService: jest.Mocked<DriveServiceInterface> = {
    listAllInvoiceFilesGroupedByClient: jest.fn(),
    downloadFile: jest.fn()
}