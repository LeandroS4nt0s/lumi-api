import { Request, Response } from 'express'
import { injectable } from 'tsyringe'
import { container } from '../../container'
import { ExtractInvoicesUseCase } from '../../application/use-cases/invoices/ExtractInvoicesUseCase'

/**
 * Controller for handling the extraction of invoices.
 * It uses the ExtractInvoicesUseCase to perform the extraction.
 * @class ExtractInvoicesController
 * @implements {ControllerInterface}
 * @method handle(req: Request, res: Response): Promise<Response>
 * @description This controller handles the HTTP request to extract invoices.
 * It uses the ExtractInvoicesUseCase to perform the extraction and returns a JSON response.
 * @example
 * const extractInvoicesController = container.resolve(ExtractInvoicesController)
 * app.post('/extract', asyncHandler(extractInvoicesController.handle.bind(extractInvoicesController)))
 */

@injectable()
export class ExtractInvoicesController {
  async handle(_: Request, res: Response): Promise<Response> {
    const useCase = container.resolve(ExtractInvoicesUseCase)
    await useCase.execute()
    return res.status(200).json({ message: 'Invoices extracted successfully.' })
  }
}
