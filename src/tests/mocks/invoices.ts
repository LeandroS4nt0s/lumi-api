import { InvoiceEntity } from "../../domain/entities/InvoiceEntity";

export const mockInvoices: InvoiceEntity[] = [
    new InvoiceEntity(
      "000",
      "JAN/2024",
      "100",
      "150,00",
      "50",
      "25,00",
      "30",
      "10,00",
      "5,00",
      "180,00",
      "10,00",
      "170,00"
    ),
    new InvoiceEntity(
      "123456",
      "FEV/2024",
      "200",
      "300,00",
      "80",
      "40,00",
      "60",
      "20,00",
      "10,00",
      "350,00",
      "20,00",
      "330,00"
    )
];