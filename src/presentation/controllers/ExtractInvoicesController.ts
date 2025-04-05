import { Request, Response } from 'express'
import { injectable } from "tsyringe"
import { container } from "../../container"
import { ExtractInvoicesUseCase } from '../../application/use-cases/invoices/ExtractInvoicesUseCase'

@injectable()
export class ExtractInvoicesController {
  async handle(_: Request, res: Response): Promise<Response> {
    try {
      const useCase = container.resolve(ExtractInvoicesUseCase)
      await useCase.execute()
      return res.status(200).json({ message: 'Invoices extracted successfully.' })
    } catch (error) {
      return res.status(500).json({ 
        message: 'Error extracting invoices.', 
        error: (error instanceof Error) ? error.message : error 
      })
    }
  }
}
