/**
 * @class InvoiceEntity
 * @description This class is used to represent an invoice entity with various attributes such as customer number, reference month, electricity consumption, costs, and total amount to pay.
 * It provides a static method to create an instance of the class from raw data, and it includes methods to parse and format the data.
 */

export class InvoiceEntity {
  constructor(
    public readonly customerNumber: string,
    public readonly referenceMonth: string,
    public readonly electricityKwh: string,
    public readonly electricityCost: string,
    public readonly sceeeEnergyKwh: string,
    public readonly sceeeEnergyCost: string,
    public readonly compensatedEnergyKwh: string,
    public readonly compensatedEnergyCost: string,
    public readonly lightingContribution: string,
    public readonly totalCostWithoutGd: string,
    public readonly gdSavings: string,
    public readonly amountToPay: string
  ) {}

  static create(data: Omit<InvoiceEntity, "totalCostWithoutGd" | "gdSavings">): InvoiceEntity {
    const parse = (val: string): number => {
      return parseFloat(val.replace(/\./g, '').replace(',', '.'));
    };

    const totalCostWithoutGd =
      (parse(data.electricityCost) +
      parse(data.sceeeEnergyCost) +
      parse(data.lightingContribution)).toFixed(2).replace('.', ',');

    const gdSavings = parse(data.compensatedEnergyCost).toFixed(2).replace('.', ',');
    

    return new InvoiceEntity(
      data.customerNumber,
      data.referenceMonth,
      data.electricityKwh,
      data.electricityCost,
      data.sceeeEnergyKwh,
      data.sceeeEnergyCost,
      data.compensatedEnergyKwh,
      data.compensatedEnergyCost,
      data.lightingContribution,
      totalCostWithoutGd,
      gdSavings,
      data.amountToPay
    );
  }
}
