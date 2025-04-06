import "reflect-metadata"
import { google } from 'googleapis'
import { GoogleDriveServiceImpl } from '../../../infrastructure/services/external/googledriveapi/GoogleDriveServiceImpl'
import { Readable } from "stream"

jest.mock('googleapis', () => {
  const listMock = jest.fn()
  const getMock = jest.fn()
  return {
    google: {
      auth: {
        GoogleAuth: jest.fn().mockImplementation(() => ({}))
      },
      drive: jest.fn().mockReturnValue({
        files: {
          list: listMock,
          get: getMock,
        }
      })
    }
  }
})

describe('GoogleDriveServiceImpl', () => {
  let service: GoogleDriveServiceImpl
  let listMock: jest.Mock
  let getMock: jest.Mock

  beforeEach(() => {
    service = new GoogleDriveServiceImpl()
    const driveMock = (google.drive as jest.Mock).mock.results[0].value
    listMock = driveMock.files.list
    getMock = driveMock.files.get
    jest.clearAllMocks()
  })

  it('should list all invoice files grouped by client', async () => {
    process.env.GOOGLE_DRIVE_FOLDER_ID = 'root-folder-id'

    listMock
      .mockResolvedValueOnce({
        data: {
          files: [{ id: 'folder1', name: 'ClienteA' }, { id: 'folder2', name: 'ClienteB' }]
        }
      })
      .mockResolvedValueOnce({
        data: {
          files: [
            { id: 'file1', name: 'jan.pdf', mimeType: 'application/pdf' },
          ]
        }
      })
      .mockResolvedValueOnce({
        data: {
          files: [
            { id: 'file2', name: 'fev.pdf', mimeType: 'application/pdf' },
          ]
        }
      })

    const result = await service.listAllInvoiceFilesGroupedByClient()

    expect(result).toEqual({
      ClienteA: [{ id: 'file1', name: 'jan.pdf', mimeType: 'application/pdf' }],
      ClienteB: [{ id: 'file2', name: 'fev.pdf', mimeType: 'application/pdf' }],
    })
  })

  it('should download a file and return buffer', async () => {
    const mockData = Buffer.from('fake-pdf-content')

    const mockStream = new Readable()
    mockStream.push(mockData)
    mockStream.push(null)

    getMock.mockResolvedValueOnce({
      data: mockStream,
    })

    const result = await service.downloadFile('some-file-id')

    expect(result).toEqual(mockData)
    expect(getMock).toHaveBeenCalledWith(
      { fileId: 'some-file-id', alt: 'media' },
      { responseType: 'stream' }
    )
  })
})
