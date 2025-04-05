import { injectable } from "tsyringe"
import { ExtractInvoicesUseCase } from "../../application/use-cases/ExtractInvoicesUseCase"
import { container } from "../../container"

@injectable()
export class ExtractInvoicesController {
  async handle(_: import("express").Request, res: import("express").Response): Promise<import("express").Response> {
    try {
      const useCase = container.resolve(ExtractInvoicesUseCase)
      await useCase.execute()
      return res.status(200).json({ message: 'Faturas extraídas com sucesso.' })
    } catch (error) {
      console.error('Erro ao extrair faturas:', error)
      return res.status(500).json({ 
        message: 'Erro ao extrair faturas.', 
        error: (error instanceof Error) ? error.message : error 
      })
    }
  }
}
