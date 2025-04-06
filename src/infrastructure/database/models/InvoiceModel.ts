import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

/**
 * InvoiceModel represents the structure of an invoice in the database.
 * It is used to map the invoice data from the database to the application.
 */

@Entity('invoices')
export class InvoiceModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  customerNumber!: string

  @Column()
  referenceMonth!: string

  @Column()
  electricityKwh!: string

  @Column()
  electricityCost!: string

  @Column()
  sceeeEnergyKwh!: string

  @Column()
  sceeeEnergyCost!: string

  @Column()
  compensatedEnergyKwh!: string

  @Column()
  compensatedEnergyCost!: string

  @Column()
  lightingContribution!: string

  @Column()
  totalCostWithoutGd!: string

  @Column()
  gdSavings!: string

  @Column()
  amountToPay!: string
}
