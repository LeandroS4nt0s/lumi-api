import  {Router} from 'express'
import { ExtractInvoicesController } from '../controllers/ExtractInvoicesController'
import { container } from '../../container'
import { ListAllInvoicesController } from '../controllers/ListAllInvoicesController'
import { ListFilteredInvoicesController } from '../controllers/LikstFilteredInvoicesController'
const AppRouter = Router()

const extractInvoicesController = container.resolve(ExtractInvoicesController)
const listAllInvoicesController = container.resolve(ListAllInvoicesController)
const listFilteredInvoicesController = container.resolve(ListFilteredInvoicesController)


AppRouter.post('/extract', (req, res, next) => {
  extractInvoicesController.handle(req, res).then(undefined, next);
})

AppRouter.get('/invoices', (req, res, next) => {
  listAllInvoicesController.handle(req, res).then(undefined, next);
})

AppRouter.get('/invoices/filter', (req, res, next) => {
  listFilteredInvoicesController.handle(req, res).then(undefined, next);
})

export default AppRouter
