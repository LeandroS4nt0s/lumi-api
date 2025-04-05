import { inject, injectable } from 'tsyringe'
import { DataSource } from 'typeorm'
import { InvoiceRepositoryInterface } from '../../../domain/repositories/InvoiceRepositoryInterface'
import { InvoiceEntity } from '../../../domain/entities/InvoiceEntity'
import { InvoiceModel } from '../models/InvoiceModel'
import { DataBaseInterface } from '../databaseInterface'
import { FilterInvoicesDTO } from '../../../application/use-cases/invoices/dtos/FilterInvoicesDTO'

@injectable()
export class InvoiceRepositoryImpl implements InvoiceRepositoryInterface {
  private dataSource: DataSource;
  
  constructor(@inject('DataBaseService') dbSource: DataBaseInterface<DataSource>) {
    this.dataSource = dbSource.getInstance()
  }
  
  async findAll(): Promise<InvoiceEntity[]> {
    const repo = this.dataSource.getRepository(InvoiceModel)
    const results = await repo.find()
    return results.map(this.toEntity)
  }

  private toEntity(model: InvoiceModel): InvoiceEntity {
    return new InvoiceEntity(
      model.customerNumber,
      model.referenceMonth,
      model.electricityKwh,
      model.electricityCost,
      model.sceeeEnergyKwh,
      model.sceeeEnergyCost,
      model.compensatedEnergyKwh,
      model.compensatedEnergyCost,
      model.lightingContribution,
      model.totalCostWithoutGd,
      model.gdSavings,
      model.amountToPay
    )
  }

  private toModel(entity: InvoiceEntity): InvoiceModel {
    const model = new InvoiceModel()
    model.customerNumber = entity.customerNumber
    model.referenceMonth = entity.referenceMonth
    model.electricityKwh = entity.electricityKwh
    model.electricityCost = entity.electricityCost
    model.sceeeEnergyKwh = entity.sceeeEnergyKwh
    model.sceeeEnergyCost = entity.sceeeEnergyCost
    model.compensatedEnergyKwh = entity.compensatedEnergyKwh
    model.compensatedEnergyCost = entity.compensatedEnergyCost
    model.lightingContribution = entity.lightingContribution
    model.totalCostWithoutGd = entity.totalCostWithoutGd
    model.gdSavings = entity.gdSavings
    model.amountToPay = entity.amountToPay

    return model
  }

  async save(invoice: InvoiceEntity): Promise<void> {
    const repo = this.dataSource.getRepository(InvoiceModel)
    const model = this.toModel(invoice)
    await repo.save(model)
  }

  async findByClient(clientNumber: string): Promise<InvoiceEntity[]> {
    const repo = this.dataSource.getRepository(InvoiceModel)
    const results = await repo.find({ where: { customerNumber: clientNumber } })
    return results.map(this.toEntity)
  }

  async findByFilters(filtersDTO: FilterInvoicesDTO): Promise<InvoiceEntity[]> {
    let { clientNumber, month } =  filtersDTO;

    const repo = this.dataSource.getRepository(InvoiceModel)

    const query = repo.createQueryBuilder('invoice')

    if (clientNumber) {
      query.andWhere('invoice.customerNumber = :clientNumber', { clientNumber })
    }

    if (month) {
      query.andWhere('invoice.referenceMonth = :month', { month })
    }

    const results = await query.getMany()
    return results.map(this.toEntity)
  }
}
