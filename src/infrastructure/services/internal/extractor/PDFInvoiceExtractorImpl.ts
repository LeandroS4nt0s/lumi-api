import { InvoiceEntity } from '../../../../domain/entities/InvoiceEntity'
import { InvoiceExtractorInterface } from '../../../../domain/services/InvoiceExtractorInterface'
import pdfParse from 'pdf-parse'

export class PDFInvoiceExtractorImpl implements InvoiceExtractorInterface {
  async extractFromPDF(buffer: Buffer): Promise<InvoiceEntity> {
    const data = await pdfParse(buffer)
    const text = data.text

    const clientMatch = this.matchMultiple(text, /Nº DO CLIENTE\s+Nº DA INSTALAÇÃO\s+(\d+)\s+(\d+)/)
    const customerNumber = clientMatch[1]

    const referenceMonth = this.match(text, /\b([A-Z]{3}\/\d{4})\b/)

    const electricityMatch = this.matchMultiple(text, /Energia Elétrica.*?kWh\s+([\d.]+)\s+([\d.,]+)\s+([\d.,]+)/)
    const electricityKwh = electricityMatch[1]
    const electricityCost = electricityMatch[3]

    const sceeeMatch = this.matchMultiple(text, /Energia SCEE s\/ ICMSkWh\s+([\d.,]+)\s+([\d.,]+)\s+([\d.,]+)/)
    const sceeeEnergyKwh = sceeeMatch[1]
    const sceeeEnergyCost = sceeeMatch[3]

    const compensatedMatch = this.matchMultiple(text, /Energia compensada GD IkWh\s+([\d.,]+)\s+([\d.,]+)\s+(-?[\d.,]+)/)
    const compensatedEnergyKwh = compensatedMatch[1]
    const compensatedEnergyCost = compensatedMatch[3]

    const lightingContribution = this.match(text, /Contrib Ilum Publica Municipal\s+([\d.,]+)/)

    const amountToPayMatch = text.match(/TOTAL\s+(\d{1,3}(?:\.\d{3})*,\d{2})/i)
    const amountToPay = amountToPayMatch ? amountToPayMatch[1] : '0,00'

    return InvoiceEntity.create({
      customerNumber,
      referenceMonth,
      electricityKwh,
      electricityCost,
      sceeeEnergyKwh,
      sceeeEnergyCost,
      compensatedEnergyKwh,
      compensatedEnergyCost,
      lightingContribution,
      amountToPay
    })
  }

  private match(text: string, regex: RegExp): string {
    const result = text.match(regex)
    if (!result) throw new Error(`Campo não encontrado para regex: ${regex}`)
    return result[1]
  }

  private matchMultiple(text: string, regex: RegExp): string[] {
    const result = text.match(regex)
    if (!result) throw new Error(`Campo não encontrado para regex: ${regex}`)
    return result.map(r => r ?? '')
  }
}
