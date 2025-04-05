import { Request, Response } from 'express'
import { ListFilteredInvoicesUseCase } from '../../application/use-cases/invoices/ListFilteredInvoicesUseCase'
import { container } from '../../container'
import { FilterInvoicesDTO } from '../../application/use-cases/invoices/dtos/FilterInvoicesDTO';


export class ListFilteredInvoicesController {
    async handle(req: Request, res: Response): Promise<Response> {
     const filters = req.query as FilterInvoicesDTO;
     
     try {
      const useCase = container.resolve(ListFilteredInvoicesUseCase)
      const invoices = await useCase.execute(filters)
      return res.status(200).json(invoices)
     } catch (error) {
       return res.status(500).json({
         message: 'Error filtering invoices.',
         error: (error instanceof Error) ? error.message : error
       })
     }
    }
}
