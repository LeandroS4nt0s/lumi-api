import { google } from 'googleapis'
import { injectable } from 'tsyringe'
import { DriveFile, DriveServiceInterface } from '../../domain/services/DriveServiceInterface'

@injectable()
export class GoogleDriveService implements DriveServiceInterface {
  private drive

  constructor() {
    const auth = new google.auth.GoogleAuth({
      keyFile: JSON.parse(process.env.GOOGLE_CREDENTIALS as string),
      scopes: ['https://www.googleapis.com/auth/drive'],
    })

    this.drive = google.drive({ version: 'v3', auth })
  }

  async listAllInvoiceFilesGroupedByClient(): Promise<Record<string, DriveFile[]>> {
    const rootFolderId = process.env.GOOGLE_DRIVE_FOLDER_ID as string
    const result: Record<string, DriveFile[]> = {}

    const clientFolders = await this.listFolders(rootFolderId)

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

  async listFolders(parentFolderId: string): Promise<any[]> {
    const res = await this.drive.files.list({
      q: `'${parentFolderId}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
      fields: 'files(id, name)',
    })

    return res.data.files || []
  }

  async listFilesInFolder(folderId: string): Promise<any[]> {
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
