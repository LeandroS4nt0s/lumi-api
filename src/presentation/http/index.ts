import  {Router} from 'express'
import { container } from '../../container'
import { ListAllInvoicesController } from '../controllers/ListAllInvoicesController'
import { ListFilteredInvoicesController } from '../controllers/ListFilteredInvoicesController'
import { asyncHandler } from '../../utils/asyncHandler'

/**
 * Router for handling invoice-related routes.
 */

const AppRouter = Router()

const listAllInvoicesController = container.resolve(ListAllInvoicesController)
const listFilteredInvoicesController = container.resolve(ListFilteredInvoicesController)

AppRouter.get('/invoices', asyncHandler(listAllInvoicesController.handle.bind(listAllInvoicesController)))
AppRouter.get('/invoices/filter', asyncHandler(listFilteredInvoicesController.handle.bind(listFilteredInvoicesController)))

export default AppRouter
