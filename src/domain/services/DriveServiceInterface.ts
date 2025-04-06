/***
 * DriveServiceInterface.ts
 * @description This interface defines the methods for interacting with Google Drive API.
 * It includes methods for listing all invoice files grouped by client and downloading a file.
 * @interface DriveServiceInterface
 * @method listAllInvoiceFilesGroupedByClient(): Promise<Record<string, DriveFile[]>>
*/


/**
 * DriveFile
 * @description This interface defines the structure of a file in Google Drive.
 * It includes the file ID, name, and MIME type.
 * @interface DriveFile
 */
export interface DriveFile {
    id: string
    name: string
    mimeType: string
  }
  
export interface DriveServiceInterface {
  listAllInvoiceFilesGroupedByClient(): Promise<Record<string, DriveFile[]>>
  downloadFile(fileId: string): Promise<Buffer>
}
  