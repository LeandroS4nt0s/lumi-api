import { Request, Response } from 'express'
import { injectable } from "tsyringe"
import { ExtractInvoicesUseCase } from "../../application/use-cases/ExtractInvoicesUseCase"
import { container } from "../../container"

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
