import { PDFInvoiceExtractorImpl } from "../../../infrastructure/services/internal/extractor/PDFInvoiceExtractorImpl";
import { invoiceTextMockSuccess } from "../../mocks/invoiceTextMockSuccess";
import { invoiceTextMockFail } from "../../mocks/invoiceTextMockFail"

import pdfParse from 'pdf-parse';

jest.mock('pdf-parse', () => jest.fn().mockImplementation(async (buffer: Buffer) => ({ text: invoiceTextMockSuccess })));

describe('PDFInvoiceExtractorImpl', () => {
  const fakeBuffer = Buffer.from('fake pdf data');

  it('should extract data from PDF buffer correctly', async () => {
    const extractor = new PDFInvoiceExtractorImpl();
    const invoiceData = await extractor.extractFromPDF(fakeBuffer);

    expect(invoiceData).toEqual({
        amountToPay: "0,00",
        compensatedEnergyCost: "-222,22",
        compensatedEnergyKwh: "456",
        customerNumber: "123456789",
        electricityCost: "47,75",
        electricityKwh: "50",
        gdSavings: "-222,22",
        lightingContribution: "49,43",
        referenceMonth: "JAN/2024",
        sceeeEnergyCost: "232,42",
        sceeeEnergyKwh: "456",
        totalCostWithoutGd: "329,60"
      });
  });

  it('should throw InternalServerError when field is not found', async () => {

    (pdfParse as jest.Mock).mockResolvedValueOnce({ text: invoiceTextMockFail });
  
    const extractor = new PDFInvoiceExtractorImpl();
    const fakeBuffer = Buffer.from('fake pdf data');
  
    await expect(extractor.extractFromPDF(fakeBuffer))
      .rejects
      .toThrow('Field not found for regex');
  });

  it('should not extract data from PDF buffer correctly cause it nos is equal', async () => {
    const extractor = new PDFInvoiceExtractorImpl();
    const invoiceData = await extractor.extractFromPDF(fakeBuffer);

    expect(invoiceData).not.toEqual({
        amountToPay: "0,00",
        electricityCost: "47,75",
        electricityKwh: "50",
        gdSavings: "-222,22",
        lightingContribution: "49,43",
        referenceMonth: "JAN/2024",
        sceeeEnergyCost: "232,42",
        sceeeEnergyKwh: "456",
        totalCostWithoutGd: "329,60"
      });
  });
});
