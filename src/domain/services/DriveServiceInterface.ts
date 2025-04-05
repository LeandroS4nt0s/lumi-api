export interface DriveFile {
    id: string
    name: string
    mimeType: string
  }
  
export interface DriveServiceInterface {
  listAllInvoiceFilesGroupedByClient(): Promise<Record<string, DriveFile[]>>
  downloadFile(fileId: string): Promise<Buffer>
}
  