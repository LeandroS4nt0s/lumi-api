import { InvoiceEntity } from "../entities/InvoiceEntity";

/***
 * @interface InvoiceExtractorInterface
 * @description This interface defines the contract for the Invoice extractor implementation.
 * It provides a method for extracting invoice data from a PDF file.
 * @method extractFromPDF(buffer: Buffer, clientName: string): Promise<InvoiceEntity>
 * @param buffer - The PDF file buffer.
 * @param instalationNumber - The number of the instalation.
 * @returns A promise that resolves to an InvoiceEntity object.
 */

export interface InvoiceExtractorInterface {
  extractFromPDF(buffer: Buffer, instalationNumber: string): Promise<InvoiceEntity>
}
