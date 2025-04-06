import "reflect-metadata";
import { InvoiceEntity } from "../../../domain/entities/InvoiceEntity";

describe("InvoiceEntity", () => {
  it("should correctly create an invoice using the static create method", () => {
    const data = {
      customerNumber: "999999",
      referenceMonth: "04/2025",
      electricityKwh: "120",
      electricityCost: "200,00",
      sceeeEnergyKwh: "30",
      sceeeEnergyCost: "50,00",
      compensatedEnergyKwh: "40",
      compensatedEnergyCost: "25,00",
      lightingContribution: "10,00",
      amountToPay: "235,00"
    };

    const invoice = InvoiceEntity.create(data);

    expect(invoice.customerNumber).toBe("999999");
    expect(invoice.referenceMonth).toBe("04/2025");
    expect(invoice.totalCostWithoutGd).toBe("260,00");
    expect(invoice.gdSavings).toBe("25,00");
    expect(invoice.amountToPay).toBe("235,00");
  });
});
