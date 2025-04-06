import "reflect-metadata"
import request from 'supertest'
import { container } from "../../../container"
import { DataBaseInterface } from "../../../domain/services/databaseInterface"
import { DataSource } from "typeorm"
import { createTestApp } from "../../createTestApp"

beforeAll(async () => {
    jest.clearAllMocks();
    const databaseService = container.resolve<DataBaseInterface<DataSource>>('DataBaseService')
    await databaseService.start()
})

afterAll(async ()=>{
    const databaseService = container.resolve<DataBaseInterface<DataSource>>('DataBaseService')
    await databaseService.stop();
})

describe('InvoiceRoutes (integration)', () => {
  it('should return all invoices', async () => {
    const response = await request(createTestApp()).get('/api/invoices')
    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
  })

  it('should return filtered invoices by clientNumber and month', async () => {
    const response = await request(createTestApp())
      .get('/api/invoices/filter')
      .query({ clientNumber: '7202210726', month: 'ABR/2024' })

    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
  })

  it('should return filtered invoices by month only', async () => {
    const response = await request(createTestApp())
      .get('/api/invoices/filter')
      .query({ month: 'JAN/2024' })

    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
  })

  it('should return filtered invoices by clientNumber only', async () => {
    const response = await request(createTestApp())
      .get('/api/invoices/filter')
      .query({ clientNumber: '7202210726' })

    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
  })
})
