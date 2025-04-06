import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListAllInvoicesUseCase } from '../../application/use-cases/invoices/ListAllInvoicesUseCase'

/**
 * Controller for handling the listing of all invoices.
 * It uses the ListAllInvoicesUseCase to perform the listing.
 * @class ListAllInvoicesController
 * @method handle(req: Request, res: Response): Promise<Response>
 * @description This controller handles the HTTP request to list all invoices.
 * It uses the ListAllInvoicesUseCase to perform the listing and returns a JSON response.
 * @example
 * const listAllInvoicesController = container.resolve(ListAllInvoicesController)
 * app.post('/invoices', asyncHandler(listAllInvoicesController.handle.bind(listAllInvoicesController)))
 */


export class ListAllInvoicesController {
  async handle(_: Request, res: Response): Promise<Response> {
    const useCase = container.resolve(ListAllInvoicesUseCase)
    const invoices = await useCase.execute()
    return res.status(200).json(invoices)
   } 
}
