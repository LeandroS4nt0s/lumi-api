import  {Router} from 'express'
import { ExtractInvoicesController } from '../controllers/ExtractInvoicesController'
import { container } from '../../container'
import { ListAllInvoicesController } from '../controllers/ListAllInvoicesController'
const AppRouter = Router()

const extractInvoicesController = container.resolve(ExtractInvoicesController)
const listAllInvoicesController = container.resolve(ListAllInvoicesController)


AppRouter.post('/extract', (req, res, next) => {
  extractInvoicesController.handle(req, res).then(undefined, next);
})

AppRouter.get('/invoices', (req, res, next) => {
  listAllInvoicesController.handle(req, res).then(undefined, next);
})

export default AppRouter
