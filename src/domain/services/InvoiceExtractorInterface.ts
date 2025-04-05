import { InvoiceEntity } from "../entities/InvoiceEntity";

export interface InvoiceExtractorInterface {
  extractFromPDF(buffer: Buffer, clientName: string): Promise<InvoiceEntity>
}
