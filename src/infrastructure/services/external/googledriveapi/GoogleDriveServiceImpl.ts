import { google } from 'googleapis'
import { injectable } from 'tsyringe'
import { DriveFile, DriveServiceInterface } from '../../../../domain/services/DriveServiceInterface'


/*** 
 * GoogleDriveServiceImpl
 * @description This class implements the GoogleDriveServiceImpl to interact with Google Drive API.
 * It provides methods to list all invoice files grouped by client and download files from Google Drive.
*/

@injectable()
export class GoogleDriveServiceImpl implements DriveServiceInterface {
  private drive

  constructor() {
    const keyFilePath = process.env.GOOGLE_APPLICATION_CREDENTIALS!

    const auth = new google.auth.GoogleAuth({
      keyFile: keyFilePath,
      scopes: ['https://www.googleapis.com/auth/drive'],
    })

    this.drive = google.drive({ version: 'v3', auth })
  }

  async listAllInvoiceFilesGroupedByClient(): Promise<Record<string, DriveFile[]>> {
    const faturasFolderId = process.env.GOOGLE_DRIVE_FOLDER_ID as string
  
    const result: Record<string, DriveFile[]> = {}
  
    const clientFolders = await this.listFolders(faturasFolderId)
  
    for (const folder of clientFolders) {
      const files = await this.listFilesInFolder(folder.id)
  
      result[folder.name] = files.map((file) => ({
        id: file.id!,
        name: file.name!,
        mimeType: file.mimeType!,
      }))
    }
  
    return result
  }
  
  private async listFolders(parentFolderId: string): Promise<any[]> {
    const res = await this.drive.files.list({
      q: `'${parentFolderId}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
      fields: 'files(id, name)',
    })

    return res.data.files || []
  }

  private async listFilesInFolder(folderId: string): Promise<any[]> {
    const res = await this.drive.files.list({
      q: `'${folderId}' in parents and mimeType != 'application/vnd.google-apps.folder' and trashed = false`,
      fields: 'files(id, name, mimeType)',
    })

    return res.data.files || []
  }

  async downloadFile(fileId: string): Promise<Buffer> {
    const res = await this.drive.files.get(
      { fileId, alt: 'media' },
      { responseType: 'stream' }
    )

    const chunks: Uint8Array[] = []

    await new Promise<void>((resolve, reject) => {
      res.data
        .on('data', (chunk) => chunks.push(chunk))
        .on('end', () => resolve())
        .on('error', (err) => reject(err))
    })

    return Buffer.concat(chunks)
  }
}
