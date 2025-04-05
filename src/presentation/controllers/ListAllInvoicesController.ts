import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListAllInvoicesUseCase } from '../../application/use-cases/ListAllInvoicesUseCase'


export class ListAllInvoicesController {
  async handle(_: Request, res: Response): Promise<Response> {
   try {
    const useCase = container.resolve(ListAllInvoicesUseCase)
    const invoices = await useCase.execute()
    return res.status(200).json(invoices)
   } catch (error) {
     return res.status(500).json({
       message: 'Error listing invoices.',
       error: (error instanceof Error) ? error.message : error
     })
   }
  }
}
