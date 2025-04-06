import { InvoiceExtractorInterface } from "../../domain/services/InvoiceExtractorInterface";

export const mockExtractor: jest.Mocked<InvoiceExtractorInterface> = {
    extractFromPDF: jest.fn()
}