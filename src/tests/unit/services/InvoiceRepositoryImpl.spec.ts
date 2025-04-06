
import 'reflect-metadata'
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm'
import { InvoiceRepositoryImpl } from '../../../infrastructure/database/repositories/InvoiceRepositoryImpl'
import { DataBaseInterface } from '../../../domain/services/databaseInterface'
import { InvoiceModel } from '../../../infrastructure/database/models/InvoiceModel'
import { InvoiceEntity } from '../../../domain/entities/InvoiceEntity'

describe('InvoiceRepositoryImpl', () => {
  let repository: InvoiceRepositoryImpl
  let mockDb: DataBaseInterface<DataSource>
  let mockDataSource: jest.Mocked<DataSource>
  let mockRepo: jest.Mocked<Repository<InvoiceModel>>

  beforeEach(() => {
    mockRepo = {
      find: jest.fn(),
      save: jest.fn(),
      createQueryBuilder: jest.fn(),
    } as any

    mockDataSource = {
      getRepository: jest.fn().mockReturnValue(mockRepo),
    } as any

    mockDb = {
      getInstance: jest.fn().mockReturnValue(mockDataSource),
      start: jest.fn(),
      stop: jest.fn(),
    }

    repository = new InvoiceRepositoryImpl(mockDb)
  })

  it('should find all invoices', async () => {
    const model = Object.assign(new InvoiceModel(), { customerNumber: '123', referenceMonth: '2025-03' })
    mockRepo.find.mockResolvedValue([model])

    const result = await repository.findAll()

    expect(result).toHaveLength(1)
    expect(result[0]).toBeInstanceOf(InvoiceEntity)
    expect(result[0].customerNumber).toBe('123')
    expect(mockRepo.find).toHaveBeenCalled()
  })

  it('should save invoice', async () => {
    const entity = new InvoiceEntity('123', '2025-03', '100', '200', '0', '0', '0', '0', '0', '0', '0', '200')
    await repository.save(entity)

    expect(mockRepo.save).toHaveBeenCalled()
    expect(mockRepo.save.mock.calls[0][0]).toBeInstanceOf(InvoiceModel)
  })

  it('should find invoices by filters', async () => {
    const mockQueryBuilder = {
      andWhere: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue([
        Object.assign(new InvoiceModel(), { customerNumber: '123', referenceMonth: '2025-03' })
      ]),
    } as any as jest.Mocked<SelectQueryBuilder<InvoiceModel>>

    mockRepo.createQueryBuilder.mockReturnValue(mockQueryBuilder)

    const result = await repository.findByFilters({ clientNumber: '123', month: '2025-03' })

    expect(result).toHaveLength(1)
    expect(mockQueryBuilder.andWhere).toHaveBeenCalledTimes(2)
    expect(result[0]).toBeInstanceOf(InvoiceEntity)
  })
})
