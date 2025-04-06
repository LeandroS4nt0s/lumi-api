import { Request, Response } from 'express'
import { ListFilteredInvoicesUseCase } from '../../application/use-cases/invoices/ListFilteredInvoicesUseCase'
import { container } from '../../container'
import { FilterInvoicesDTO } from '../../application/use-cases/invoices/dtos/FilterInvoicesDTO';


/**
 * Controller for handling the listing of filtered invoices.
 * It uses the ListFilteredInvoicesUseCase to perform the listing.
 * @class ListFilteredInvoicesController
 * @method handle(req: Request, res: Response): Promise<Response>
 * @description This controller handles the HTTP request to list filtered invoices.
 * It uses the ListFilteredInvoicesUseCase to perform the listing and returns a JSON response.
 * @example
 * const listFilteredInvoicesController = container.resolve(ListFilteredInvoicesController)
 * app.post('/invoices/filter', asyncHandler(listFilteredInvoicesController.handle.bind(listFilteredInvoicesController)))
 */

export class ListFilteredInvoicesController {
    async handle(req: Request, res: Response): Promise<Response> {
      const filters = req.query as FilterInvoicesDTO;
      const useCase = container.resolve(ListFilteredInvoicesUseCase)
      const invoices = await useCase.execute(filters)
      return res.status(200).json(invoices)
     }
}
